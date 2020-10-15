import {LocalstorageService} from './localstorage.service';
import {
  LocalstorageConfigs,
  LocalstorageIterateHandler,
  LocalstorageIterateKeysHandler,
} from '../types/localstorage.type';
import {CacheRefresher} from '../types/cache.type';

export class CacheService {
  private cacheLocalstorage: LocalstorageService;

  constructor(
    private localstorageService: LocalstorageService,
    storageConfigs?: LocalstorageConfigs
  ) {
    this.cacheLocalstorage = this.localstorageService.extend(
      storageConfigs
        ? storageConfigs
        : {
            name: 'SHEETBASE_CACHE',
          }
    );
  }

  extend(storageConfigs: LocalstorageConfigs) {
    return new CacheService(this.localstorageService, storageConfigs);
  }

  async set<Data>(key: string, data: Data, cacheTime = 0) {
    cacheTime = Math.abs(cacheTime);
    if (!key) {
      throw new Error('No cache key provided.');
    }
    if (cacheTime === 0) {
      throw new Error('No cache time provided.');
    }
    // save expiration
    await this.localstorageService.set<number>(
      key + '__expiration',
      new Date().getTime() + cacheTime * 60000
    );
    // return value
    return this.localstorageService.set<Data>(key, data);
  }

  async get<Data>(
    key: string,
    refresher?: CacheRefresher<Data>,
    cacheTime = 0,
    keyBuilder?: (data: Data) => string
  ) {
    // retrieve cached
    const expiration = await this.localstorageService.get<number>(
      key + '__expiration'
    );
    const isExpired = !expiration || expiration <= new Date().getTime();
    // not expired
    if (!isExpired) {
      return this.localstorageService.get<Data>(key);
    }
    // expired or no cached
    try {
      if (refresher) {
        const freshData = await refresher(); // refresh
        // return value if cache time = 0
        // else save cache then return value
        if (cacheTime === 0) {
          return freshData;
        } else {
          return this.set(
            keyBuilder ? keyBuilder(freshData) : key,
            freshData,
            cacheTime
          );
        }
      } else {
        return null;
      }
    } catch (error) {
      // no refresher or error while refreshing
      // use cached any value or null
      return refresher ? this.localstorageService.get<Data>(key) : null;
    }
  }

  iterate<Data>(handler: LocalstorageIterateHandler<Data>) {
    return this.localstorageService.iterate(handler);
  }

  iterateKeys(handler: LocalstorageIterateKeysHandler) {
    return this.localstorageService.iterateKeys(handler);
  }

  async remove(key: string) {
    await this.localstorageService.remove(key + '__expiration');
    return await this.localstorageService.remove(key);
  }

  async removeBulk(keys: string[]) {
    for (let i = 0; i < keys.length; i++) {
      await this.remove(keys[i]);
    }
  }

  removeByPrefix(prefix: string) {
    return this.localstorageService.removeByPrefix(prefix);
  }

  removeBySuffix(suffix: string) {
    return this.localstorageService.removeBySuffix(suffix);
  }

  flush() {
    return this.localstorageService.clear();
  }

  flushExpired() {
    return this.localstorageService.iterateKeys(async key => {
      // loop through all expiration keys
      if (key.indexOf('__expiration') !== -1) {
        // retrieve expiration
        const cacheExpiration = (await this.localstorageService.get(
          key
        )) as number;
        // remove if expired
        if (!cacheExpiration || cacheExpiration <= new Date().getTime()) {
          await this.localstorageService.remove(key); // expiration
          await this.localstorageService.remove(
            key.replace('__expiration', '')
          ); // value
        }
      }
    });
  }
}
