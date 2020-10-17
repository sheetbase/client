import {
  UserInfo,
  UserEditableProfile,
  UserProfileSettings,
} from '@sheetbase/models';

import {HelperService} from '../../lib/services/helper.service';
import {ApiService} from '../../api/services/api.service';

export class UserObject {
  // user secret
  idToken: string;
  refreshToken: string;

  // user info
  uid: undefined | string;
  providerId: undefined | string;
  email: undefined | string;
  emailVerified: undefined | boolean;
  type: undefined | string;
  createdAt: undefined | string;
  lastLogin: undefined | string;
  username: undefined | string;
  phoneNumber: undefined | number | string;
  displayName: undefined | string;
  photoURL: undefined | string;
  bio: undefined | string;
  url: undefined | string;
  addresses: undefined | string | {[name: string]: unknown};
  additionalData: undefined | {[key: string]: unknown};
  claims: undefined | {[claim: string]: unknown};
  settings: undefined | UserProfileSettings;
  isAnonymous: undefined | boolean;
  isNewUser: undefined | boolean;

  constructor(
    private helperService: HelperService,
    private myApiService: ApiService,
    info: UserInfo,
    idToken: string,
    refreshToken: string
  ) {
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.setInfo(info);
  }

  private setInfo(info: UserInfo) {
    const {
      uid,
      providerId,
      email,
      emailVerified,
      type,
      createdAt,
      lastLogin,
      username,
      phoneNumber,
      displayName,
      photoURL,
      bio,
      url,
      addresses,
      additionalData,
      claims,
      settings,
      isAnonymous,
      isNewUser,
    } = info;
    this.uid = uid;
    this.providerId = providerId;
    this.email = email;
    this.emailVerified = emailVerified;
    this.type = type;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
    this.username = username;
    this.displayName = displayName;
    this.phoneNumber = phoneNumber;
    this.photoURL = photoURL;
    this.bio = bio;
    this.url = url;
    this.addresses = addresses;
    this.additionalData = additionalData as Record<string, unknown>;
    this.claims = claims;
    this.settings = settings;
    this.isAnonymous = isAnonymous;
    this.isNewUser = isNewUser;
    return info;
  }

  toJSON() {
    const uid = this.uid;
    const providerId = this.providerId;
    const email = this.email;
    const emailVerified = this.emailVerified;
    const type = this.type;
    const createdAt = this.createdAt;
    const lastLogin = this.lastLogin;
    const username = this.username;
    const phoneNumber = this.phoneNumber;
    const displayName = this.displayName;
    const photoURL = this.photoURL;
    const bio = this.bio;
    const url = this.url;
    const addresses = this.addresses;
    const additionalData = this.additionalData;
    const claims = this.claims;
    const settings = this.settings;
    const isAnonymous = this.isAnonymous;
    const isNewUser = this.isNewUser;
    return {
      uid,
      providerId,
      email,
      emailVerified,
      type,
      createdAt,
      lastLogin,
      username,
      phoneNumber,
      displayName,
      photoURL,
      bio,
      url,
      addresses,
      additionalData,
      claims,
      settings,
      isAnonymous,
      isNewUser,
    };
  }

  async getIdToken(forceRefresh = false) {
    // renew
    if (this.helperService.isExpiredJWT(this.idToken) || forceRefresh) {
      const result = await this.myApiService.get('/token', {
        refreshToken: this.refreshToken,
      });
      this.idToken = result ? (result as {idToken: string}).idToken : '';
    }
    return this.idToken;
  }

  async getIdTokenResult(forceRefresh = false) {
    const idToken = await this.getIdToken(forceRefresh);
    return this.helperService.decodeJWTPayload(idToken);
  }

  async sendEmailVerification() {
    if (!this.emailVerified) {
      return await this.myApiService.put(
        '/oob',
        {},
        {
          mode: 'verifyEmail',
          email: this.email,
        }
      );
    }
  }

  async updateProfile(profile: UserEditableProfile) {
    const newInfo = await this.myApiService.post(
      '/user',
      {},
      {
        profile,
      }
    );
    return this.setInfo(newInfo as UserInfo);
  }

  async setAdditionalData(data: Record<string, unknown>) {
    const newInfo = await this.myApiService.post(
      '/user/additional',
      {},
      {
        additionalData: data,
      }
    );
    return this.setInfo(newInfo as UserInfo);
  }

  async setSettings(data: Record<string, unknown>) {
    const newInfo = await this.myApiService.post(
      '/user/settings',
      {},
      {
        settings: data,
      }
    );
    return this.setInfo(newInfo as UserInfo);
  }

  async setProfilePublicly(props: string | string[]) {
    const newInfo = await this.myApiService.post(
      '/user/publicly',
      {},
      {
        publicly: props,
      }
    );
    return this.setInfo(newInfo as UserInfo);
  }

  async setProfilePrivately(props: string | string[]) {
    const newInfo = await this.myApiService.post(
      '/user/privately',
      {},
      {
        privately: props,
      }
    );
    return this.setInfo(newInfo as UserInfo);
  }

  async setUsername(username: string) {
    const newInfo = await this.myApiService.post(
      '/user/username',
      {},
      {
        username,
      }
    );
    return this.setInfo(newInfo as UserInfo);
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return await this.myApiService.post(
      '/user/password',
      {},
      {
        currentPassword,
        newPassword,
      }
    );
  }

  async logout() {
    return await this.myApiService.delete('/');
  }

  async delete() {
    return await this.myApiService.delete(
      '/cancel',
      {},
      {
        refreshToken: this.refreshToken,
      }
    );
  }
}
