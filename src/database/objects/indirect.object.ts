import {OptionService} from '../../lib/services/option.service';
import {ApiService} from '../../api/services/api.service';

import {Query, DocsContentStyle, DataSegment} from '../types/database.type';

export class IndirectObject {
  private myApiService: ApiService;

  constructor(
    private optionService: OptionService,
    private apiService: ApiService
  ) {
    this.myApiService = this.apiService
      .extend()
      .setEndpoint(
        this.optionService.getOptions().databaseEndpoint || 'database'
      );
  }

  all<Item>(sheet: string) {
    return this.myApiService.get<Item[]>('/', {sheet});
  }

  query<Item>(sheet: string, query: Query, segment?: DataSegment) {
    const params = {sheet} as Record<string, string>;
    params['query'] = encodeURIComponent(JSON.stringify(query));
    if (segment) {
      params['segment'] = encodeURIComponent(JSON.stringify(segment));
    }
    return this.myApiService.get<Item[]>('/', params);
  }

  item<Item>(sheet: string, key: string) {
    return this.myApiService.get<Item>('/', {sheet, key});
  }

  async docsContent(docId: string, style: DocsContentStyle = 'full') {
    const result = await this.myApiService.get<{
      docId: string;
      content: string;
    }>('/content', {docId, style});
    return result ? result.content : '';
  }

  set<Data>(sheet: string, key: string, data: Data) {
    return this.myApiService.post<unknown>(
      '/',
      {},
      {sheet, key, data, clean: true}
    );
  }

  update<Data>(sheet: string, key: string, data: Data) {
    return this.myApiService.post<unknown>('/', {}, {sheet, key, data});
  }

  add<Data>(sheet: string, key: string, data: Data) {
    return this.update(sheet, key, data);
  }

  remove(sheet: string, key: string) {
    return this.update(sheet, key, null);
  }

  increase(
    sheet: string,
    key: string,
    increasing: string | string[] | {[path: string]: number}
  ) {
    return this.myApiService.post<unknown>('/', {}, {sheet, key, increasing});
  }
}
