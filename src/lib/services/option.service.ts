import {Options} from '../types/app.type';

export class OptionService {
  private options: Options;

  constructor(options?: Options) {
    this.options = {
      ...options,
    };
  }

  getOptions() {
    return this.options;
  }
}
