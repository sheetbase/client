import {Options} from './types/app.type';
import {HelperService} from './services/helper.service';
import {OptionService} from './services/option.service';
import {LocalstorageService} from './services/localstorage.service';
import {CacheService} from './services/cache.service';
import {FetchService} from './services/fetch.service';

export class Lib {
  helperService: HelperService;
  optionService: OptionService;
  localstorageService: LocalstorageService;
  cacheService: CacheService;
  fetchService: FetchService;

  constructor(options?: Options) {
    this.helperService = new HelperService();
    this.optionService = new OptionService(options);
    this.localstorageService = new LocalstorageService();
    this.cacheService = new CacheService(this.localstorageService);
    this.fetchService = new FetchService(this.helperService, this.cacheService);
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
}
