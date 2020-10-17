import {OptionService} from '../../lib/services/option.service';
import {ApiService} from '../../api/services/api.service';

import {
  MailingData,
  MailSentResult,
  MailingQuota,
  MailingThread,
} from '../types/mail.type';

export class MailService {
  private myApiService: ApiService;

  constructor(
    private optionService: OptionService,
    private apiService: ApiService
  ) {
    this.myApiService = this.apiService
      .extend()
      .setEndpoint(this.optionService.getOptions().mailEndpoint || 'mail');
  }

  quota() {
    return this.myApiService.get<MailingQuota>('/');
  }

  threads(category = 'uncategorized') {
    return this.myApiService.get<MailingThread[]>('/threads', {category});
  }

  send(
    mailingData: MailingData,
    category = 'uncategorized',
    template = null,
    silent = null
  ) {
    return this.myApiService.put<MailSentResult>(
      '/',
      {},
      {mailingData, category, template, silent}
    );
  }
}
