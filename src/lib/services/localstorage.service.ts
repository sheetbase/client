import {createInstance} from 'localforage';

import {
  LocalstorageConfigs,
  LocalstorageIterateHandler,
  LocalstorageIterateKeysHandler,
} from '../types/localstorage.type';

export class LocalstorageService {
  private localforage: LocalForage;

  constructor(storageConfigs?: LocalstorageConfigs) {
    this.localforage = createInstance(
      storageConfigs
        ? storageConfigs
        : {
            name: 'SHEETBASE_STORAGE',
          }
    );
  }

  extend(storageConfigs: LocalstorageConfigs) {
    return new LocalstorageService(storageConfigs);
  }

  async set<Data>(key: string, data: Data) {
    return await this.localforage.setItem(key, data);
  }

  async get<Data>(key: string) {
    return await this.localforage.getItem<Data>(key);
  }

  async iterate<Data>(handler: LocalstorageIterateHandler<Data>) {
    return await this.localforage.iterate(handler);
  }

  async iterateKeys(handler: LocalstorageIterateKeysHandler) {
    const keys = await this.keys();
    for (let i = 0; i < keys.length; i++) {
      await handler(keys[i], i);
    }
  }

  async remove(key: string) {
    return await this.localforage.removeItem(key);
  }

  async removeBulk(keys: string[]) {
    for (let i = 0; i < keys.length; i++) {
      this.remove(keys[i]);
    }
  }

  async removeByPrefix(prefix: string) {
    return await this.iterateKeys(async key => {
      if (key.substr(0, prefix.length) === prefix) {
        await this.remove(key);
      }
    });
  }

  async removeBySuffix(suffix: string) {
    return await this.iterateKeys(async key => {
      if (key.substr(-suffix.length) === suffix) {
        await this.remove(key);
      }
    });
  }

  async clear() {
    return await this.localforage.clear();
  }

  async keys() {
    return await this.localforage.keys();
  }
}
