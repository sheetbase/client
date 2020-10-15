import {Options} from './types/app.type';

import {HelperService} from './services/helper.service';
import {OptionService} from './services/option.service';
import {LocalstorageService} from './services/localstorage.service';
import {CacheService} from './services/cache.service';
import {FetchService} from './services/fetch.service';
import {ApiService} from '../api/services/api.service';

import {ContainerObject} from './objects/container.object';

// Object.defineProperty(window, 'SHEETBASE_CONTAINER', {
//   value: new ContainerObject(),
// });
// Object.defineProperty(window, 'SHEETBASE_COMPONENTS', {value: {}});

export function initializeApp(options?: Options, name?: string) {
  return ((window as unknown) as Record<
    'SHEETBASE_CONTAINER',
    ContainerObject
  >).SHEETBASE_CONTAINER.createApp(options, name);
}

export class Lib {
  helperService: HelperService;
  optionService: OptionService;
  localstorageService: LocalstorageService;
  cacheService: CacheService;
  fetchService: FetchService;

  apiService: undefined | ApiService;

  constructor(options?: Options) {
    this.helperService = new HelperService();
    this.optionService = new OptionService(options);
    this.localstorageService = new LocalstorageService();
    this.cacheService = new CacheService(this.localstorageService);
    this.fetchService = new FetchService(this.helperService, this.cacheService);
    // custom components
    const components = ((window as unknown) as Record<
      'SHEETBASE_COMPONENTS',
      {
        ApiService?: Constructable<ApiService>;
      }
    >).SHEETBASE_COMPONENTS;
    if (components.ApiService) {
      this.apiService = new components.ApiService(
        this.helperService,
        this.optionService,
        this.cacheService,
        this.fetchService
      );
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
}

interface Constructable<Cls> {
  new (...args: unknown[]): Cls;
}
