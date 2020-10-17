import {Options, Constructable, CustomComponents} from '../types/app.type';

import {HelperService} from '../services/helper.service';
import {OptionService} from '../services/option.service';
import {LocalstorageService} from '../services/localstorage.service';
import {CacheService} from '../services/cache.service';
import {FetchService} from '../services/fetch.service';
import {ApiService} from '../../api/services/api.service';
import {DatabaseService} from '../../database/services/database.service';
import {StorageService} from '../../storage/services/storage.service';
import {MailService} from '../../mail/services/mail.service';
import {AuthService} from '../../auth/services/auth.service';

export class AppObject {
  helperService: HelperService;
  optionService: OptionService;
  localstorageService: LocalstorageService;
  cacheService: CacheService;
  fetchService: FetchService;
  apiService: undefined | ApiService;
  databaseService: undefined | DatabaseService;
  storageService: undefined | StorageService;
  mailService: undefined | MailService;
  authService: undefined | AuthService;

  constructor(options?: Options, components: CustomComponents = []) {
    this.helperService = new HelperService();
    this.optionService = new OptionService(options);
    this.localstorageService = new LocalstorageService();
    this.cacheService = new CacheService(this.localstorageService);
    this.fetchService = new FetchService(this.helperService, this.cacheService);
    // custom components
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (component.name === 'ApiService') {
        this.apiService = new (component as Constructable<ApiService>)(
          this.helperService,
          this.optionService,
          this.cacheService,
          this.fetchService
        );
      } else if (component.name === 'DatabaseService') {
        this.databaseService = new (component as Constructable<
          DatabaseService
        >)(
          this.helperService,
          this.optionService,
          this.cacheService,
          this.fetchService,
          this.apiService
        );
      } else if (component.name === 'StorageService') {
        this.storageService = new (component as Constructable<StorageService>)(
          this.optionService,
          this.apiService
        );
      } else if (component.name === 'MailService') {
        this.mailService = new (component as Constructable<MailService>)(
          this.optionService,
          this.apiService
        );
      } else if (component.name === 'AuthService') {
        this.authService = new (component as Constructable<AuthService>)(
          this.helperService,
          this.optionService,
          this.localstorageService,
          this.apiService
        );
      }
    }
  }

  helper() {
    return this.helperService;
  }

  option() {
    return this.optionService;
  }

  localstorage() {
    return this.localstorageService;
  }

  cache() {
    return this.cacheService;
  }

  fetch() {
    return this.fetchService;
  }

  api() {
    if (!this.apiService) {
      throw new Error('No api component.');
    }
    return this.apiService;
  }

  database() {
    if (!this.databaseService) {
      throw new Error('No database component.');
    }
    return this.databaseService;
  }

  storage() {
    if (!this.storageService) {
      throw new Error('No storage component.');
    }
    return this.storageService;
  }

  mail() {
    if (!this.mailService) {
      throw new Error('No mail component.');
    }
    return this.mailService;
  }

  auth() {
    if (!this.authService) {
      throw new Error('No auth component.');
    }
    return this.authService;
  }
}
