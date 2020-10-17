import {ApiOptions} from '../../api/types/api.type';
import {DatabaseOptions} from '../../database/types/database.type';
import {StorageOptions} from '../../storage/types/storage.type';
import {MailOptions} from '../../mail/types/mail.type';
import {AuthOptions} from '../../auth/types/auth.type';
import {ApiService} from '../../api/services/api.service';
import {DatabaseService} from '../../database/services/database.service';
import {StorageService} from '../../storage/services/storage.service';
import {MailService} from '../../mail/services/mail.service';
import {AuthService} from '../../auth/services/auth.service';

export interface Options
  extends ApiOptions,
    DatabaseOptions,
    StorageOptions,
    MailOptions,
    AuthOptions {}

export interface PopupConfigs {
  url: string;
  name?: string;
  options?: string;
  callback?: () => unknown;
}

export type CustomComponents = Array<
  | Constructable<ApiService>
  | Constructable<DatabaseService>
  | Constructable<StorageService>
  | Constructable<MailService>
  | Constructable<AuthService>
>;

export interface Constructable<C> {
  new (...args: unknown[]): C;
}
