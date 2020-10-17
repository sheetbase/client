import {publish, subscribe} from 'pubsub-js';
import {UserInfo} from '@sheetbase/models';

import {HelperService} from '../../lib/services/helper.service';
import {OptionService} from '../../lib/services/option.service';
import {LocalstorageService} from '../../lib/services/localstorage.service';
import {ApiService} from '../../api/services/api.service';

import {AuthCredential} from '../types/auth.type';
import {UserObject} from '../objects/user.object';
import {ProviderObject} from '../objects/provider.object';

export class AuthService {
  private myApiService: ApiService;
  private oauthProvider: undefined | ProviderObject; // remember provider for using in processing oauth result

  SHEETBASE_USER_CHANGED = 'SHEETBASE_USER_CHANGED';
  SHEETBASE_USER_INFO = 'user_info';
  SHEETBASE_USER_CREDS = 'user_creds';

  currentUser: undefined | UserObject;

  constructor(
    private helperService: HelperService,
    private optionService: OptionService,
    private localstorageService: LocalstorageService,
    private apiService: ApiService
  ) {
    this.myApiService = this.apiService
      .addBeforeHooks(async data => {
        if (this.currentUser) {
          (data.query || {})['idToken'] = await this.currentUser.getIdToken();
        }
        return data;
      })
      .extend()
      .setEndpoint(this.optionService.getOptions().authEndpoint || 'auth');
    // initial change state (signin locally)
    setTimeout(() => this.signInWithLocalUser(), 1000);
  }

  onAuthStateChanged(next: (user: UserObject) => void) {
    subscribe(this.SHEETBASE_USER_CHANGED, (msg: unknown, user: UserObject) =>
      next(user)
    );
  }

  async checkActionCode(code: string) {
    return await this.myApiService.get('/oob', {oobCode: code});
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const {info, idToken, refreshToken} = await this.myApiService.put(
      '/',
      {},
      {
        email,
        password,
        offlineAccess: true,
      }
    );
    const user = await this.signIn(info, idToken, refreshToken);
    return {user};
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    let user: undefined | UserObject;
    if (this.currentUser) {
      user = this.currentUser;
    } else {
      const {info, idToken, refreshToken} = await this.myApiService.post(
        '/',
        {},
        {
          email,
          password,
          offlineAccess: true,
        }
      );
      user = await this.signIn(info, idToken, refreshToken);
    }
    return {user};
  }

  async signInWithCustomToken(token: string) {
    let user: undefined | UserObject;
    if (this.currentUser) {
      user = this.currentUser;
    } else {
      const {info, idToken, refreshToken} = await this.myApiService.post(
        '/',
        {},
        {
          customToken: token,
          offlineAccess: true,
        }
      );
      user = await this.signIn(info, idToken, refreshToken);
    }
    return {user};
  }

  async signInAnonymously() {
    let user: undefined | UserObject;
    if (this.currentUser) {
      user = this.currentUser;
    } else {
      const {info, idToken, refreshToken} = await this.myApiService.put(
        '/',
        {},
        {
          offlineAccess: true,
        }
      );
      user = await this.signIn(info, idToken, refreshToken);
    }
    return {user};
  }

  async sendPasswordResetEmail(email: string) {
    return await this.myApiService.put(
      '/oob',
      {},
      {mode: 'resetPassword', email}
    );
  }

  async verifyPasswordResetCode(code: string) {
    return await this.myApiService.get('/oob', {
      oobCode: code,
      mode: 'resetPassword',
    });
  }

  async confirmPasswordReset(code: string, newPassword: string) {
    return await this.myApiService.post(
      '/oob',
      {},
      {
        oobCode: code,
        mode: 'resetPassword',
        newPassword,
      }
    );
  }

  async signInWithPopup(provider: ProviderObject) {
    if (!this.currentUser) {
      const {authProviders} = this.optionService.getOptions();
      const providerConfig = authProviders
        ? authProviders[provider.providerId]
        : null;
      if (providerConfig) {
        // remember provider
        this.oauthProvider = provider;
        // add handler to parent window
        Object.defineProperty(window, 'handleOauthResult', {
          value: (fragment: string) => this.handleOauthResult(fragment),
        });
        // process request
        const {clientId, redirectUri} = providerConfig;
        return this.helperService.createPopup({
          url: provider.url(
            clientId,
            redirectUri || this.helperService.getHost() + '/__/auth/handler'
          ),
        });
      }
    }
  }

  googleAuthProvider() {
    return new ProviderObject(
      'google.com',
      'https://accounts.google.com/o/oauth2/v2/auth',
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
    );
  }

  facebookAuthProvider() {
    return new ProviderObject(
      'facebook.com',
      'https://www.facebook.com/v3.2/dialog/oauth',
      'email'
    );
  }

  async signOut() {
    this.currentUser = undefined;
    // notify user change
    publish(this.SHEETBASE_USER_CHANGED, null);
    // remove user info & id token & refresh token from local
    await this.localstorageService.remove(this.SHEETBASE_USER_INFO);
    await this.localstorageService.remove(this.SHEETBASE_USER_CREDS);
  }

  private async signIn(info: UserInfo, idToken: string, refreshToken: string) {
    const {uid} = info;
    this.currentUser = new UserObject(
      this.helperService,
      this.myApiService,
      info,
      idToken,
      refreshToken
    );
    // notify user change
    publish(this.SHEETBASE_USER_CHANGED, this.currentUser);
    // save user info & id token & refresh token to local
    await this.localstorageService.set(this.SHEETBASE_USER_INFO, info);
    await this.localstorageService.set(this.SHEETBASE_USER_CREDS, {
      uid,
      idToken,
      refreshToken,
    });
    return this.currentUser;
  }

  private async signInWithLocalUser() {
    // retrieve local creds and info
    const creds = (await this.localstorageService.get(
      this.SHEETBASE_USER_CREDS
    )) as Record<string, unknown>;
    let info = (await this.localstorageService.get(
      this.SHEETBASE_USER_INFO
    )) as Record<string, unknown>;
    // log user in
    if (!!creds && !!info && creds.uid === info.uid) {
      let idToken = creds.idToken as string;
      // caching check
      const beenSeconds =
        (new Date().getTime() - new Date(info.lastLogin as string).getTime()) /
        1000;
      if (beenSeconds > 86400) {
        // info expired, over 1 day
        // renew idToken if expired
        if (this.helperService.isExpiredJWT(idToken)) {
          const expiredUser = new UserObject(
            this.helperService,
            this.myApiService,
            info,
            idToken,
            creds.refreshToken as string
          );
          idToken = await expiredUser.getIdToken();
        }
        // fetch new info
        info = (await this.myApiService.get('/user', {idToken})) as Record<
          string,
          unknown
        >;
      }
      // sign user in
      this.signIn(info, idToken, creds.refreshToken as string);
    } else {
      // notify initial state changed
      publish(this.SHEETBASE_USER_CHANGED, null);
    }
  }

  private async handleOauthResult(result: string) {
    // if result available
    if (result !== '') {
      // process query
      const query = result.substr(1).split('&');
      // Parse the URI hash to fetch the access token
      const credential: AuthCredential = {};
      for (let i = 0; i < query.length; i++) {
        const [key, value = null] = query[i].split('=');
        let finalValue = value as unknown;
        if (key === 'scope') {
          finalValue = (value as string).split('%20');
        } else if (key === 'expires_in') {
          finalValue = +(value as string);
        }
        (credential as Record<string, unknown>)[key] = finalValue;
      }
      // get user profile
      if (!credential.access_token) {
        throw new Error('Sheetbase oauth error!'); // no access token
      } else {
        return await this.processOauthResult(credential);
      }
    } else {
      throw new Error('Sheetbase oauth error!');
    }
  }

  private async processOauthResult(credential: AuthCredential) {
    const {access_token: accessToken} = credential;
    const {providerId} = this.oauthProvider as ProviderObject;
    const {info, idToken, refreshToken} = (await this.myApiService.get(
      '/oauth',
      {
        providerId,
        accessToken: accessToken as string,
      }
    )) as Record<string, unknown>;
    const user = await this.signIn(
      info as UserInfo,
      idToken as string,
      refreshToken as string
    );
    return {user};
  }
}
