import {Options, CustomComponents} from '../types/app.type';

import {HelperService} from '../services/helper.service';
import {OptionService} from '../services/option.service';
import {LocalstorageService} from '../services/localstorage.service';
import {CacheService} from '../services/cache.service';
import {FetchService} from '../services/fetch.service';
import {ApiService} from '../../api/services/api.service';

export class AppObject {
  helperService: HelperService;
  optionService: OptionService;
  localstorageService: LocalstorageService;
  cacheService: CacheService;
  fetchService: FetchService;
  apiService: undefined | ApiService;

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
        this.apiService = new component(
          this.helperService,
          this.optionService,
          this.cacheService,
          this.fetchService
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
}
