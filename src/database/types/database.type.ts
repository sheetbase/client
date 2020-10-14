export interface DatabaseOptions
  extends DatabasePublicOptions,
    DatabaseCachingOptions,
    DatabaseContentOptions {
  databaseEndpoint?: string;
}

export interface DatabasePublicOptions {
  databaseId?: string;
  databaseGids?: DatabaseGids;
}

export interface DatabaseCachingOptions {
  databaseUseCached?: boolean;
  databaseCacheTime?: number;
}

export interface DatabaseContentOptions {
  databaseAutoContent?: boolean;
  databaseDocsStyle?: DocsContentStyle;
}

export type Filter<Item> = Query | AdvancedFilter<Item>;

export type AdvancedFilter<Item> = (item: Item) => boolean;

export type Query = ShorthandQuery | SingleQuery | MultiQuery;

export type ShorthandQuery = {[field: string]: unknown};

export interface SingleQuery {
  where: string;
  equal?: unknown;
  exists?: boolean;
  contains?: string;
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  childExists?: unknown;
  childEqual?: string;
}

export interface MultiQuery {
  and?: SingleQuery[];
  or?: SingleQuery[];
}

export type DocsContentStyle = 'clean' | 'full' | 'original';

export interface DataSegment {
  [field: string]: unknown;
}

export interface DatabaseGids {
  [sheet: string]: string;
}

export type DataParser = (value: unknown) => unknown;

export type ListingOrder = 'asc' | 'desc';

export interface ListingFilter {
  order?: ListingOrder | ListingOrder[];
  orderBy?: string | string[];
  limit?: number; // +/- limit to first/last
  offset?: number;
}

export interface ItemsOptions extends ListingFilter {
  useCached?: boolean;
  cacheTime?: number;
  segment?: DataSegment; // this or global, bypass global: {} (empty)
}

export interface ItemOptions extends ItemsOptions {
  docsStyle?: DocsContentStyle;
  autoContent?: boolean; // json:// & content://
}
