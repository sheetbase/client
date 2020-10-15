import {Options} from '../types/app.type';
import {Lib as App} from '../index';

export class ContainerObject {
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
