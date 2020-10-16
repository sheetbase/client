import {Options, CustomComponents} from '../types/app.type';
import {AppObject} from './app.object';

export class ContainerObject {
  private apps: {[name: string]: AppObject} = {};

  constructor() {}

  createApp(
    options?: Options,
    components?: CustomComponents,
    name = 'DEFAULT'
  ) {
    if (this.apps[name]) {
      throw new Error(`An app exists with the name "${name}".`);
    }
    this.apps[name] = new AppObject(options, components);
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
