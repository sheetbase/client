import {ApiOptions} from '../../api/types/api.type';
import {DatabaseOptions} from '../../database/types/database.type';
import {StorageOptions} from '../../storage/types/storage.type';
import {MailOptions} from '../../mail/types/mail.type';
import {AuthOptions} from '../../auth/types/auth.type';
import {ApiService} from '../../api/services/api.service';

export interface Options
  extends ApiOptions,
    AuthOptions,
    DatabaseOptions,
    StorageOptions,
    MailOptions {}

export interface PopupConfigs {
  url: string;
  name?: string;
  options?: string;
  callback?: () => unknown;
}

export type CustomComponents = Array<Constructable<ApiService>>;

export interface Constructable<C> {
  new (...args: unknown[]): C;
}
