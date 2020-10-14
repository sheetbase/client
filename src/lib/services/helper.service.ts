import {PopupConfigs} from '../types/app.type';
import {md5} from '../vendors/md5.vendor';
import {orderBy} from '../vendors/orderby.vendor';

export class HelperService {
  constructor() {}

  md5(str: string, key?: string | undefined, raw?: boolean) {
    return md5(str, key, raw);
  }

  orderBy(
    collection: unknown[],
    iteratees: string[],
    orders: string[],
    guard?: unknown
  ) {
    return orderBy(collection, iteratees, orders, guard);
  }

  decodeJWTPayload(token: string) {
    const [, payloadStr] = token.split('.');
    return JSON.parse(atob(payloadStr));
  }

  isExpiredJWT(token: string) {
    const {exp} = this.decodeJWTPayload(token);
    return this.isExpiredInSeconds(exp || 0, 60); // exp or always, and 1 minute earlier
  }

  isExpiredInSeconds(expiredTime: number, costMore = 0) {
    const time = Math.ceil(new Date().getTime() / 1000) + costMore;
    return time >= expiredTime;
  }

  createPopup(config: PopupConfigs) {
    const url = config.url || '/';
    const name = config.name || 'SheetbaseOAuthLogin'; // no space for IE
    const options =
      config.options ||
      'location=0,status=0' +
        ',width=' +
        window.innerWidth +
        ',height=' +
        window.innerHeight;
    const callback = config.callback || (() => true);
    // launch window
    const oauthWindow = window.open(url, name, options);
    // cackback
    const oauthInterval = window.setInterval(() => {
      if (oauthWindow && oauthWindow.closed) {
        window.clearInterval(oauthInterval);
        return callback();
      }
    }, 1000);
  }

  getHost() {
    let host: string;
    // get from base tag if it exists
    const baseTags = document.getElementsByTagName('base');
    if (baseTags.length) {
      host = baseTags[0].href;
    } else {
      // else from window.location.href
      const [scheme, domain] = window.location.href.split('/').filter(Boolean);
      host = scheme + '//' + domain;
    }
    return host;
  }
}
