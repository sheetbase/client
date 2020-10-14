// NOTE: move this file to build script

import {Options} from './types/app.type';

import {Lib as App} from './index';

class Container {
  private apps: {[name: string]: App} = {};

  constructor() {}

  createApp(options?: Options, name = 'DEFAULT') {
    if (this.apps[name]) {
      throw new Error(`An app exists with the name "${name}".`);
    }
    this.apps[name] = new App(options);
    return this.apps[name];
  }

  getApp(name = 'DEFAULT') {
    const app = this.apps[name];
    if (!app) {
      throw new Error(
        `No app exists with the name "${name}". Please run initializeApp() first.`
      );
    }
    return app;
  }
}

Object.defineProperty(window, 'SHEETBASE_CONTAINER', {value: new Container()});
Object.defineProperty(window, 'SHEETBASE_COMPONENTS', {value: {}});

export function initializeApp(options?: Options, name?: string) {
  return ((window as unknown) as Record<
    'SHEETBASE_CONTAINER',
    Container
  >).SHEETBASE_CONTAINER.createApp(options, name);
}
