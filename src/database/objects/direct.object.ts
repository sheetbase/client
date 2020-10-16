import {parse} from 'papaparse';

import {OptionService} from '../../lib/services/option.service';
import {FetchService} from '../../lib/services/fetch.service';

import {
  DocsContentStyle,
  DatabaseGids,
  DataParser,
} from '../types/database.type';

export class DirectObject {
  private BUILTIN_PUBLIC_GIDS = {
    categories: '101',
    tags: '102',
    pages: '103',
    posts: '104',
    authors: '105',
    threads: '106',
    options: '108',
    bundles: '111',
    audios: '112',
    videos: '113',
    products: '114',
    notifications: '181',
    promotions: '182',
  };
  private AUTO_LOADED_JSON_SCHEME = 'json://';
  private AUTO_LOADED_TEXT_SCHEME = 'content://';

  private databaseId: string;
  private databaseGids: DatabaseGids;
  private customDataParser: undefined | DataParser;

  constructor(
    private optionService: OptionService,
    private fetchService: FetchService
  ) {
    const {databaseId, databaseGids} = this.optionService.getOptions();
    this.databaseId = databaseId as string;
    this.databaseGids = {
      ...this.BUILTIN_PUBLIC_GIDS,
      ...(databaseGids || {}),
    };
  }

  registerDataParser(parser: DataParser): DirectObject {
    this.customDataParser = parser;
    return this;
  }

  async all<Item extends Record<string, unknown>>(sheet: string) {
    const url = this.buildPublishedUrl(sheet);
    const csvText = await this.fetchService.get<string>(url, {}, false);
    const rawItems = await this.parseCSV<Item>(csvText || '');
    // process raw items
    const items: Item[] = [];
    for (let i = 0, l = rawItems.length; i < l; i++) {
      const item = this.parseData(rawItems[i]);
      // save item to the result if not empty
      if (Object.keys(item).length) {
        (item as Record<string, unknown>)['_row'] = i + 2;
        items.push(item);
      }
    }
    // final result
    return items;
  }

  // Google Docs html content
  async docsContent(docId: string, style: DocsContentStyle = 'full') {
    const url =
      'https://docs.google.com/document/d/' + docId + '/pub?embedded=true';
    const content = await this.fetchService.get<string>(url, {}, false);
    return this.processDocsContent(content || '', style);
  }

  // text-based content (txt, html, md, ...)
  textContent(url: string) {
    return this.fetchService.get<string>(url, {}, false);
  }

  // json content
  jsonContent<Data>(url: string) {
    return this.fetchService.get<Data>(url);
  }

  // is this sheet available for direct access
  hasAccess(sheet: string) {
    return !!this.databaseId && !!this.databaseGids[sheet];
  }

  isUrl(value: string) {
    return (
      !!value &&
      typeof value === 'string' &&
      (value.substr(0, 7) === 'http://' || value.substr(0, 8) === 'https://')
    );
  }

  isFileId(value: string) {
    // example: 17wmkJn5wDY8o_91kYw72XLT_NdZS3u0W
    // usually an 33 characters id, and starts with 1
    return (
      !!value &&
      typeof value === 'string' &&
      value.substr(0, 1) === '1' &&
      value.length > 31 &&
      value.length < 35
    );
  }

  isDocId(value: string) {
    // example: 1u1J4omqU7wBKJTspw53p6U_B_IA2Rxsac4risNxwTTc
    // usually an 44 characters id, and starts with 1
    return (
      !!value &&
      typeof value === 'string' &&
      value.substr(0, 1) === '1' &&
      value.length > 42 &&
      value.length < 46
    );
  }

  buildFileUrl(id: string) {
    return 'https://drive.google.com/uc?id=' + id;
  }

  // return url to resource or a doc id
  buildAutoLoadedValue(rawValue: string, scheme: string) {
    let value = rawValue.replace(scheme, '');
    if (!this.isUrl(value) && this.isFileId(value)) {
      value = this.buildFileUrl(value);
    }
    return value;
  }

  buildPublishedUrl(sheet: string, output = 'csv') {
    return (
      'https://docs.google.com/spreadsheets/d/' +
      this.databaseId +
      '/pub' +
      '?gid=' +
      this.databaseGids[sheet] +
      '&output=' +
      output +
      '&single=true'
    );
  }

  parseCSV<Item extends Record<string, unknown>>(csv: string) {
    return new Promise<Item[]>((resolve, reject) => {
      parse(csv, {
        header: true,
        complete: result =>
          !result.errors.length
            ? resolve(result.data as Item[])
            : reject(result.errors),
      });
    });
  }

  parseData<Item extends Record<string, unknown>>(item: Item) {
    for (const key of Object.keys(item)) {
      let value = item[key];
      // remove empty values
      if (value === '' || value === undefined || value === null) {
        delete item[key];
      } else {
        // 1. BASIC
        if ((value + '').toLowerCase() === 'true') {
          // TRUE
          value = true;
        } else if ((value + '').toLowerCase() === 'false') {
          // FALSE
          value = false;
        } else if (!isNaN(value as number)) {
          // number
          value = Number(value);
        } else {
          // JSON
          try {
            value = JSON.parse(value as string);
          } catch (e) {
            /* invalid json, keep value as is */
          }
        }
        // 2. BUILTIN
        // uc url builder
        if (this.isFileId(value as string)) {
          value = this.buildFileUrl(value as string);
        }
        // 3. CUSTOM
        if (
          !!this.customDataParser &&
          this.customDataParser instanceof Function
        ) {
          value = this.customDataParser(value);
        }
        // FINALLY (overwrite the value)
        (item as Record<string, unknown>)[key] = value;
      }
    }
    return item;
  }

  processDocsContent(html: string, style: DocsContentStyle = 'full') {
    let content = html; // original
    // not original
    if (style !== 'original') {
      // extract content, between: </head></html>
      const contentMatch = html.match(/<\/head>(.*)<\/html>/);
      content = contentMatch ? (contentMatch.pop() as string) : content;
      // remove useless tags
      content = content
        .replace(/<body(.*?)>/, '') // replace: <body...>
        .replace('</body>', '') // replace </body>
        .replace(/<script(.*?)<\/script>/g, '') // remove all script tag
        .replace(/<style(.*?)<\/style>/g, ''); // remove all style tag
      // replace redirect links
      const links = content.match(
        /"https:\/\/www\.google\.com\/url\?q=(.*?)"/g
      );
      if (links) {
        for (let i = 0, l = links.length; i < l; i++) {
          const link = links[i];
          const urlMatch = link.match(
            /"https:\/\/www\.google\.com\/url\?q=(.*?)&amp;/
          );
          if (urlMatch) {
            const url = urlMatch.pop();
            content = content.replace(link, '"' + url + '"');
          }
        }
      }
      // specific: full
      if (style === 'full') {
        // move class styles to inline
        const classStyles = this.getCSSByClasses(html) as Record<
          string,
          unknown
        >;
        for (const key of Object.keys(classStyles)) {
          content = content.replace(
            new RegExp('class="' + key + '"', 'g'),
            'style="' + classStyles[key] + '"'
          );
        }
        // TODO: move tag styles to inline
      }
      // specific: clean
      else if (style === 'clean') {
        // remove attributes
        const removeAttrs = ['style', 'id', 'class', 'width', 'height'];
        for (let i = 0, l = removeAttrs.length; i < l; i++) {
          content = content.replace(
            new RegExp(' ' + removeAttrs[i] + '="(.*?)"', 'g'),
            ''
          );
        }
      }
    }
    return content;
  }

  async fulfillItemContent<Item extends Record<string, unknown>>(
    item: Item,
    docsStyle: DocsContentStyle = 'full'
  ) {
    // check all props and load values
    for (const prop of Object.keys(item)) {
      const propValue = item[prop];
      // auto-loaded json://
      if (
        typeof propValue === 'string' &&
        propValue.substr(0, this.AUTO_LOADED_JSON_SCHEME.length) ===
          this.AUTO_LOADED_JSON_SCHEME
      ) {
        // load and overwrite the data
        const autoLoadedValue = this.buildAutoLoadedValue(
          propValue,
          this.AUTO_LOADED_JSON_SCHEME
        );
        (item as Record<string, unknown>)[prop] = await this.jsonContent(
          autoLoadedValue
        );
      }
      // auto-loaded content://
      if (
        typeof propValue === 'string' &&
        propValue.substr(0, this.AUTO_LOADED_TEXT_SCHEME.length) ===
          this.AUTO_LOADED_TEXT_SCHEME
      ) {
        const autoLoadedValue = this.buildAutoLoadedValue(
          propValue,
          this.AUTO_LOADED_TEXT_SCHEME
        );
        (item as Record<string, unknown>)[prop] = this.isDocId(autoLoadedValue)
          ? await this.docsContent(autoLoadedValue, docsStyle)
          : await this.textContent(autoLoadedValue);
      }
    }
    return item;
  }

  private getCSSByClasses(html: string) {
    // copy class to inline
    const classGroups = {} as Record<string, string>;
    const classes = {} as Record<string, string>;
    // extract classes
    const classStrs = html.match(/class="(.*?)"/g);
    if (classStrs) {
      for (let i = 0, l = classStrs.length; i < l; i++) {
        const classStr = classStrs[i].match(/class="(.*?)"/);
        if (classStr) {
          const classNamesStr = classStr.pop() as string;
          // add to classGroups
          if (classNamesStr.indexOf(' ') > -1) {
            classGroups[classNamesStr] = '';
          }
          // add to classes
          const classNames = classNamesStr.split(' ').filter(Boolean);
          for (let j = 0, lj = classNames.length; j < lj; j++) {
            classes[classNames[j]] = '';
          }
        }
      }
    }
    // get class styles
    for (const className of Object.keys(classes)) {
      const stylesMatch = html.match(new RegExp('.' + className + '{(.*?)}'));
      // extract styles
      if (stylesMatch) {
        classes[className] =
          (stylesMatch.pop() as string).replace(/"/g, "'") + ';';
      }
    }
    // get group styles
    for (const classGroup of Object.keys(classGroups)) {
      let groupStyles = '';
      const classNames = classGroup.split(' ').filter(Boolean);
      for (let i = 0, l = classNames.length; i < l; i++) {
        groupStyles = groupStyles + classes[classNames[i]];
      }
      // save styles to group
      classGroups[classGroup] = groupStyles;
    }
    return {...classGroups, ...classes};
  }
}
