import {HelperService} from '../../lib/services/helper.service';
import {OptionService} from '../../lib/services/option.service';
import {CacheService} from '../../lib/services/cache.service';
import {FetchService} from '../../lib/services/fetch.service';
import {ApiService} from '../../api/services/api.service';

import {
  Filter,
  DataParser,
  DataSegment,
  DocsContentStyle,
  ItemsOptions,
  ItemOptions,
} from '../types/database.type';
import {DirectObject} from '../objects/direct.object';
import {IndirectObject} from '../objects/indirect.object';
import {FilterObject} from '../objects/filter.object';

export class DatabaseService {
  private databaseDirect: DirectObject;
  private databaseIndirect: IndirectObject;
  private databaseFilter: FilterObject;

  private globalSegment: undefined | DataSegment;

  constructor(
    private helperService: HelperService,
    private optionService: OptionService,
    private cacheService: CacheService,
    private fetchService: FetchService,
    private apiService: ApiService
  ) {
    this.databaseDirect = new DirectObject(
      this.optionService,
      this.fetchService
    );
    this.databaseIndirect = new IndirectObject(
      this.optionService,
      this.apiService
    );
    this.databaseFilter = new FilterObject(this.helperService);
  }

  direct() {
    return this.databaseDirect;
  }

  indirect() {
    return this.databaseIndirect;
  }

  setSegmentation(globalSegment: DataSegment): DatabaseService {
    this.globalSegment = globalSegment;
    return this;
  }

  registerDataParser(parser: DataParser): DatabaseService {
    this.databaseDirect.registerDataParser(parser);
    return this;
  }

  private getItemsOptions(options: ItemsOptions): ItemsOptions {
    const {
      databaseUseCached = true,
      databaseCacheTime = 1440,
    } = this.optionService.getOptions();
    const {
      useCached,
      cacheTime,
      segment,
      order,
      orderBy,
      limit,
      offset,
    } = options;
    return {
      useCached: useCached === undefined ? databaseUseCached : useCached,
      cacheTime: cacheTime === undefined ? databaseCacheTime : cacheTime,
      segment,
      order,
      orderBy,
      limit,
      offset,
    };
  }

  private getItemOptions(options: ItemOptions): ItemOptions {
    const {
      databaseAutoContent = true,
      databaseDocsStyle = 'full',
    } = this.optionService.getOptions();
    const {autoContent, docsStyle} = options;
    const itemsOptions = this.getItemsOptions(options);
    return {
      ...itemsOptions,
      autoContent:
        autoContent === undefined ? databaseAutoContent : autoContent,
      docsStyle: docsStyle || databaseDocsStyle,
    };
  }

  all<Item extends Record<string, unknown>>(sheet: string, cacheTime = 1440) {
    return this.cacheService.get(
      `database_${sheet}`,
      async () => {
        // load from direct
        if (this.databaseDirect.hasAccess(sheet)) {
          try {
            return await this.databaseDirect.all<Item>(sheet);
          } catch (error) {
            // not published
            // or any errors
            throw new Error(
              "Unable to access '" +
                sheet +
                "' directly, it may not be published."
            );
          }
        }
        // load from server
        else {
          return await this.databaseIndirect.all<Item>(sheet);
        }
      },
      cacheTime
    );
  }

  async query<Item extends Record<string, unknown>>(
    sheet: string,
    filter: Filter<Item>,
    options: ItemsOptions = {}
  ) {
    const {useCached, segment, cacheTime} = this.getItemsOptions(options);
    return this.cacheService.get(
      `database_${sheet}_query_${this.helperService.md5(
        JSON.stringify(filter)
      )}`,
      async () => {
        // server
        if (!useCached) {
          if (filter instanceof Function) {
            throw new Error('Can only use advanced filter with cached data.');
          }
          return this.databaseIndirect.query<Item>(
            sheet,
            filter,
            segment || this.globalSegment
          );
        }
        // cached
        else {
          // get all items
          const allItems = await this.all<Item>(sheet, cacheTime);
          // build filters
          const advancedFilter = this.databaseFilter.buildAdvancedFilter(
            filter
          );
          const segmentFilter = this.databaseFilter.buildSegmentFilter<Item>(
            segment || this.globalSegment || {}
          );
          // query local items
          const items = (allItems || []).filter(
            item => segmentFilter(item) && advancedFilter(item)
          );
          return this.databaseFilter.applyListingFilter(items, options);
        }
      },
      // only save query cache with server data
      useCached ? 0 : cacheTime
    );
  }

  // a proxy to all & query
  async items<Item extends Record<string, unknown>>(
    sheet: string,
    filter?: Filter<Item>,
    options: ItemsOptions = {}
  ) {
    if (filter) {
      return this.query<Item>(sheet, filter, options);
    } else {
      const {cacheTime} = this.getItemsOptions(options);
      return this.all<Item>(sheet, cacheTime);
    }
  }

  async item<Item extends Record<string, unknown>>(
    sheet: string,
    finder: string | number | Filter<Item>,
    options: ItemOptions = {}
  ) {
    const {useCached, cacheTime, docsStyle, autoContent} = this.getItemOptions(
      options
    );
    return this.cacheService.get(
      '',
      async () => {
        let item: null | Item = null;
        // server
        if (!useCached) {
          if (typeof finder !== 'string') {
            throw new Error('Can only get item from server with item $key.');
          }
          item = await this.databaseIndirect.item(sheet, finder as string);
        }
        // cached
        else {
          // # finder
          if (typeof finder === 'number') {
            finder = {where: '#', equal: finder};
          }
          // $key finder
          if (typeof finder === 'string') {
            finder = {where: '$key', equal: finder};
          }
          // query items
          const items = await this.query(sheet, finder, options);
          // extract item
          if ((items || []).length === 1) {
            item = (items as Item[])[0];
          }
        }
        // return final item
        return autoContent
          ? this.databaseDirect.fulfillItemContent(item as Item, docsStyle)
          : item;
      },
      cacheTime,
      item => `database_${sheet}_item_${(item as Item)['$key']}`
    );
  }

  // Google Docs html content
  docsContent(
    docId: string,
    docsStyle: DocsContentStyle = 'full',
    cacheTime = 1440
  ) {
    return this.cacheService.get<string>(
      `content_${docId}_${docsStyle}`,
      () => this.databaseDirect.docsContent(docId, docsStyle),
      cacheTime
    );
  }

  // text-based content (txt, html, md, ...)
  textContent(url: string, cacheTime = 1440) {
    return this.cacheService.get<string>(
      `content_${this.helperService.md5(url)}`,
      () => this.databaseDirect.textContent(url) as Promise<string>,
      cacheTime
    );
  }

  // json content
  jsonContent<Data>(url: string, cacheTime = 1440) {
    return this.cacheService.get<Data>(
      `content_${this.helperService.md5(url)}`,
      () => this.databaseDirect.jsonContent(url) as Promise<Data>,
      cacheTime
    );
  }

  set<Data>(sheet: string, key: string, data: Data) {
    return this.databaseIndirect.set(sheet, key, data);
  }

  update<Data>(sheet: string, key: string, data: Data) {
    return this.databaseIndirect.update(sheet, key, data);
  }

  add<Data>(sheet: string, key: string, data: Data) {
    return this.databaseIndirect.add(sheet, key, data);
  }

  remove(sheet: string, key: string) {
    return this.databaseIndirect.remove(sheet, key);
  }

  increase(
    sheet: string,
    key: string,
    increasing: string | string[] | {[path: string]: number}
  ) {
    return this.databaseIndirect.increase(sheet, key, increasing);
  }

  clearCachedAll(input: string | string[]) {
    // turn string to string[]
    input = typeof input === 'string' ? [input] : input;
    // clear data
    for (const sheet of input) {
      this.cacheService.removeByPrefix(`database_${sheet}`);
    }
  }

  clearCachedItem(sheet: string, key: string) {
    return this.cacheService.removeByPrefix(`database_${sheet}_item_${key}`);
  }

  // remove cached content by doc id or url
  clearCachedContent(cachedInput: string) {
    cachedInput = this.databaseDirect.isUrl(cachedInput)
      ? this.helperService.md5(cachedInput)
      : cachedInput;
    return this.cacheService.removeByPrefix(`content_${cachedInput}`);
  }

  itemsOriginal<Item extends Record<string, unknown>>(
    sheet: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !item['origin'] || item['origin'] === item['$key'],
      options
    );
  }

  itemsDraft<Item extends Record<string, unknown>>(
    sheet: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !item['status'] || item['status'] === 'draft',
      options
    );
  }

  itemsPublished<Item extends Record<string, unknown>>(
    sheet: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !!item['status'] && item['status'] === 'published',
      options
    );
  }

  itemsArchived<Item extends Record<string, unknown>>(
    sheet: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !!item['status'] && item['status'] === 'archived',
      options
    );
  }

  async itemsByRelated<Item extends Record<string, unknown>>(
    sheet: string,
    baseItem: Item,
    options: ItemsOptions = {}
  ) {
    // retrieve category & tag
    const {categories, tags} = baseItem as Item;
    const categoryKey =
      !categories || typeof categories === 'string'
        ? null
        : Object.keys(categories as Record<string, unknown>).shift();
    const tagKey =
      !tags || typeof tags === 'string'
        ? null
        : Object.keys(tags as Record<string, unknown>).shift();
    // get all items
    const items = await this.items<Item>(sheet, undefined, options);
    // process items
    const matchedItems: Item[] = [];
    const unmatchedItems: Item[] = [];
    for (let i = 0; i < (items || []).length; i++) {
      const item = (items || [])[i];
      // ignore the input item
      if (
        !!item['$key'] &&
        !!baseItem['$key'] &&
        item['$key'] === baseItem['$key']
      ) {
        continue;
      }
      // check other items
      if (
        (!!categoryKey &&
          !!item['categories'] &&
          !!(item['categories'] as Record<string, unknown>)[categoryKey]) ||
        (!!tagKey &&
          !!item['tags'] &&
          !!(item['tags'] as Record<string, unknown>)[tagKey])
      ) {
        matchedItems.push(item);
      } else {
        unmatchedItems.push(item);
      }
    }
    return [...matchedItems, ...unmatchedItems];
  }

  itemsByType<Item extends Record<string, unknown>>(
    sheet: string,
    type: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !!item['type'] && item['type'] === type,
      options
    );
  }

  itemsByTypeDefault<Item extends Record<string, unknown>>(
    sheet: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(sheet, item => !item['type'], options);
  }

  itemsByAuthor<Item extends Record<string, unknown>>(
    sheet: string,
    authorKey: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item =>
        !!item['authors'] &&
        !!(item['authors'] as Record<string, unknown>)[authorKey],
      options
    );
  }

  itemsByLocale<Item extends Record<string, unknown>>(
    sheet: string,
    locale: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !!item['locale'] && item['locale'] === locale,
      options
    );
  }

  itemsByOrigin<Item extends Record<string, unknown>>(
    sheet: string,
    origin: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item => !!item['origin'] && item['origin'] === origin,
      options
    );
  }

  itemsByParent<Item extends Record<string, unknown>>(
    sheet: string,
    parentKey: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item =>
        !!item['parents'] &&
        !!(item['parents'] as Record<string, unknown>)[parentKey],
      options
    );
  }

  itemsByTerm<Item extends Record<string, unknown>>(
    sheet: string,
    taxonomy: string,
    termKey: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item =>
        !!item[taxonomy] &&
        !!(item[taxonomy] as Record<string, unknown>)[termKey],
      options
    );
  }

  itemsByCategory<Item extends Record<string, unknown>>(
    sheet: string,
    categoryKey: string,
    options: ItemsOptions = {}
  ) {
    return this.itemsByTerm<Item>(sheet, 'categories', categoryKey, options);
  }

  itemsByTag<Item extends Record<string, unknown>>(
    sheet: string,
    tagKey: string,
    options: ItemsOptions = {}
  ) {
    return this.itemsByTerm<Item>(sheet, 'tags', tagKey, options);
  }

  itemsByKeyword<Item extends Record<string, unknown>>(
    sheet: string,
    keyword: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item =>
        !!item['keywords'] &&
        (item['keywords'] as string).indexOf(keyword) > -1,
      options
    );
  }

  itemsByMetaExists<Item extends Record<string, unknown>>(
    sheet: string,
    metaKey: string,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item =>
        !!item['meta'] && !!(item['meta'] as Record<string, unknown>)[metaKey],
      options
    );
  }

  itemsByMetaEquals<Item extends Record<string, unknown>>(
    sheet: string,
    metaKey: string,
    equalTo: unknown,
    options: ItemsOptions = {}
  ) {
    return this.items<Item>(
      sheet,
      item =>
        !!item['meta'] &&
        (item['meta'] as Record<string, unknown>)[metaKey] === equalTo,
      options
    );
  }

  viewing(sheet: string, key: string) {
    return this.increase(sheet, key, 'viewCount');
  }

  liking(sheet: string, key: string) {
    return this.increase(sheet, key, 'likeCount');
  }

  commenting(sheet: string, key: string) {
    return this.increase(sheet, key, 'commentCount');
  }

  rating(sheet: string, key: string, stars: number) {
    return this.increase(sheet, key, {
      'rating/count': 1,
      'rating/total': stars,
    });
  }

  sharing(sheet: string, key: string, providers: string[] = []) {
    const customData = {} as Record<string, number>;
    for (const provider of providers) {
      customData['sharing/' + provider] = 1;
    }
    return this.increase(sheet, key, {
      ...customData,
      'sharing/total': 1,
    });
  }
}
