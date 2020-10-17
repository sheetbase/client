<section id="head" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

# @sheetbase/client

**Javascript client for Sheetbase app.**

</section>

<section id="options" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Name                                                                                                   | Type                                                                                                                         | Description |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [apiKey?](https://sheetbase.github.io/client/interfaces/options.html#apikey)                           | <code>undefined \| string</code>                                                                                             |             |
| [authEndpoint?](https://sheetbase.github.io/client/interfaces/options.html#authendpoint)               | <code>undefined \| string</code>                                                                                             |             |
| [authProviders?](https://sheetbase.github.io/client/interfaces/options.html#authproviders)             | <code>undefined \| object</code>                                                                                             |             |
| [backendUrl?](https://sheetbase.github.io/client/interfaces/options.html#backendurl)                   | <code>undefined \| string</code>                                                                                             |             |
| [databaseAutoContent?](https://sheetbase.github.io/client/interfaces/options.html#databaseautocontent) | <code>undefined \| false \| true</code>                                                                                      |             |
| [databaseCacheTime?](https://sheetbase.github.io/client/interfaces/options.html#databasecachetime)     | <code>undefined \| number</code>                                                                                             |             |
| [databaseDocsStyle?](https://sheetbase.github.io/client/interfaces/options.html#databasedocsstyle)     | <code><a href="https://sheetbase.github.io/client/globals.html#docscontentstyle" target="_blank">DocsContentStyle</a></code> |             |
| [databaseEndpoint?](https://sheetbase.github.io/client/interfaces/options.html#databaseendpoint)       | <code>undefined \| string</code>                                                                                             |             |
| [databaseGids?](https://sheetbase.github.io/client/interfaces/options.html#databasegids)               | <code><a href="https://sheetbase.github.io/client/interfaces/databasegids.html" target="_blank">DatabaseGids</a></code>      |             |
| [databaseId?](https://sheetbase.github.io/client/interfaces/options.html#databaseid)                   | <code>undefined \| string</code>                                                                                             |             |
| [databaseUseCached?](https://sheetbase.github.io/client/interfaces/options.html#databaseusecached)     | <code>undefined \| false \| true</code>                                                                                      |             |
| [loggingEndpoint?](https://sheetbase.github.io/client/interfaces/options.html#loggingendpoint)         | <code>undefined \| string</code>                                                                                             |             |
| [mailEndpoint?](https://sheetbase.github.io/client/interfaces/options.html#mailendpoint)               | <code>undefined \| string</code>                                                                                             |             |
| [storageAllowTypes?](https://sheetbase.github.io/client/interfaces/options.html#storageallowtypes)     | <code>string[]</code>                                                                                                        |             |
| [storageEndpoint?](https://sheetbase.github.io/client/interfaces/options.html#storageendpoint)         | <code>undefined \| string</code>                                                                                             |             |
| [storageMaxSize?](https://sheetbase.github.io/client/interfaces/options.html#storagemaxsize)           | <code>undefined \| number</code>                                                                                             |             |

</section>

<section id="appobject" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

<h2><a name="appobject" href="https://sheetbase.github.io/client/classes/appobject.html"><p>The <code>AppObject</code> class</p>
</a></h2>

**The `AppObject` class.**

<h3><a name="appobject-properties"><p>AppObject properties</p>
</a></h3>

| Name                                                                                                 | Type                                                                                                                                    | Description |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [apiService](https://sheetbase.github.io/client/classes/appobject.html#apiservice)                   | <code>undefined \| <a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code>           |             |
| [authService](https://sheetbase.github.io/client/classes/appobject.html#authservice)                 | <code>undefined \| <a href="https://sheetbase.github.io/client/classes/authservice.html" target="_blank">AuthService</a></code>         |             |
| [cacheService](https://sheetbase.github.io/client/classes/appobject.html#cacheservice)               | <code><a href="https://sheetbase.github.io/client/classes/cacheservice.html" target="_blank">CacheService</a></code>                    |             |
| [databaseService](https://sheetbase.github.io/client/classes/appobject.html#databaseservice)         | <code>undefined \| <a href="https://sheetbase.github.io/client/classes/databaseservice.html" target="_blank">DatabaseService</a></code> |             |
| [fetchService](https://sheetbase.github.io/client/classes/appobject.html#fetchservice)               | <code><a href="https://sheetbase.github.io/client/classes/fetchservice.html" target="_blank">FetchService</a></code>                    |             |
| [helperService](https://sheetbase.github.io/client/classes/appobject.html#helperservice)             | <code><a href="https://sheetbase.github.io/client/classes/helperservice.html" target="_blank">HelperService</a></code>                  |             |
| [localstorageService](https://sheetbase.github.io/client/classes/appobject.html#localstorageservice) | <code><a href="https://sheetbase.github.io/client/classes/localstorageservice.html" target="_blank">LocalstorageService</a></code>      |             |
| [mailService](https://sheetbase.github.io/client/classes/appobject.html#mailservice)                 | <code>undefined \| <a href="https://sheetbase.github.io/client/classes/mailservice.html" target="_blank">MailService</a></code>         |             |
| [optionService](https://sheetbase.github.io/client/classes/appobject.html#optionservice)             | <code><a href="https://sheetbase.github.io/client/classes/optionservice.html" target="_blank">OptionService</a></code>                  |             |
| [storageService](https://sheetbase.github.io/client/classes/appobject.html#storageservice)           | <code>undefined \| <a href="https://sheetbase.github.io/client/classes/storageservice.html" target="_blank">StorageService</a></code>   |             |

<h3><a name="appobject-methods"><p>AppObject methods</p>
</a></h3>

| Function                                    | Returns type                                                                                                                       | Description |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [api()](#appobject-api-0)                   | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code>                   |             |
| [auth()](#appobject-auth-0)                 | <code><a href="https://sheetbase.github.io/client/classes/authservice.html" target="_blank">AuthService</a></code>                 |             |
| [cache()](#appobject-cache-0)               | <code><a href="https://sheetbase.github.io/client/classes/cacheservice.html" target="_blank">CacheService</a></code>               |             |
| [database()](#appobject-database-0)         | <code><a href="https://sheetbase.github.io/client/classes/databaseservice.html" target="_blank">DatabaseService</a></code>         |             |
| [fetch()](#appobject-fetch-0)               | <code><a href="https://sheetbase.github.io/client/classes/fetchservice.html" target="_blank">FetchService</a></code>               |             |
| [helper()](#appobject-helper-0)             | <code><a href="https://sheetbase.github.io/client/classes/helperservice.html" target="_blank">HelperService</a></code>             |             |
| [localstorage()](#appobject-localstorage-0) | <code><a href="https://sheetbase.github.io/client/classes/localstorageservice.html" target="_blank">LocalstorageService</a></code> |             |
| [mail()](#appobject-mail-0)                 | <code><a href="https://sheetbase.github.io/client/classes/mailservice.html" target="_blank">MailService</a></code>                 |             |
| [option()](#appobject-option-0)             | <code><a href="https://sheetbase.github.io/client/classes/optionservice.html" target="_blank">OptionService</a></code>             |             |
| [storage()](#appobject-storage-0)           | <code><a href="https://sheetbase.github.io/client/classes/storageservice.html" target="_blank">StorageService</a></code>           |             |

<h4><a name="appobject-api-0" href="https://sheetbase.github.io/client/classes/appobject.html#api"><p><code>api()</code></p>
</a></h4>

**The `api` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code>

---

<h4><a name="appobject-auth-0" href="https://sheetbase.github.io/client/classes/appobject.html#auth"><p><code>auth()</code></p>
</a></h4>

**The `auth` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/authservice.html" target="_blank">AuthService</a></code>

---

<h4><a name="appobject-cache-0" href="https://sheetbase.github.io/client/classes/appobject.html#cache"><p><code>cache()</code></p>
</a></h4>

**The `cache` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/cacheservice.html" target="_blank">CacheService</a></code>

---

<h4><a name="appobject-database-0" href="https://sheetbase.github.io/client/classes/appobject.html#database"><p><code>database()</code></p>
</a></h4>

**The `database` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/databaseservice.html" target="_blank">DatabaseService</a></code>

---

<h4><a name="appobject-fetch-0" href="https://sheetbase.github.io/client/classes/appobject.html#fetch"><p><code>fetch()</code></p>
</a></h4>

**The `fetch` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/fetchservice.html" target="_blank">FetchService</a></code>

---

<h4><a name="appobject-helper-0" href="https://sheetbase.github.io/client/classes/appobject.html#helper"><p><code>helper()</code></p>
</a></h4>

**The `helper` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/helperservice.html" target="_blank">HelperService</a></code>

---

<h4><a name="appobject-localstorage-0" href="https://sheetbase.github.io/client/classes/appobject.html#localstorage"><p><code>localstorage()</code></p>
</a></h4>

**The `localstorage` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/localstorageservice.html" target="_blank">LocalstorageService</a></code>

---

<h4><a name="appobject-mail-0" href="https://sheetbase.github.io/client/classes/appobject.html#mail"><p><code>mail()</code></p>
</a></h4>

**The `mail` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/mailservice.html" target="_blank">MailService</a></code>

---

<h4><a name="appobject-option-0" href="https://sheetbase.github.io/client/classes/appobject.html#option"><p><code>option()</code></p>
</a></h4>

**The `option` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/optionservice.html" target="_blank">OptionService</a></code>

---

<h4><a name="appobject-storage-0" href="https://sheetbase.github.io/client/classes/appobject.html#storage"><p><code>storage()</code></p>
</a></h4>

**The `storage` call signature.**

**Returns**

<code><a href="https://sheetbase.github.io/client/classes/storageservice.html" target="_blank">StorageService</a></code>

---

</section>

<section id="helperservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                                       | Returns type         | Description |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------- |
| [createPopup(config)](https://sheetbase.github.io/client/classes/helperservice.html#createpopup)                               | <code>void</code>    |             |
| [decodeJWTPayload(token)](https://sheetbase.github.io/client/classes/helperservice.html#decodejwtpayload)                      | <code>any</code>     |             |
| [getHost()](https://sheetbase.github.io/client/classes/helperservice.html#gethost)                                             | <code>string</code>  |             |
| [isExpiredInSeconds(expiredTime, costMore?)](https://sheetbase.github.io/client/classes/helperservice.html#isexpiredinseconds) | <code>boolean</code> |             |
| [isExpiredJWT(token)](https://sheetbase.github.io/client/classes/helperservice.html#isexpiredjwt)                              | <code>boolean</code> |             |
| [md5(str, key?, raw?)](https://sheetbase.github.io/client/classes/helperservice.html#md5)                                      | <code>string</code>  |             |
| [orderBy(collection, iteratees, orders, guard?)](https://sheetbase.github.io/client/classes/helperservice.html#orderby)        | <code>any</code>     |             |

</section>

<section id="license" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

## License

**@sheetbase/client** is released under the [MIT](https://github.com/sheetbase/client/blob/master/LICENSE) license.

</section>

<section id="optionservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                 | Returns type                                                                                                  | Description |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------- |
| [getOptions()](https://sheetbase.github.io/client/classes/optionservice.html#getoptions) | <code><a href="https://sheetbase.github.io/client/interfaces/options.html" target="_blank">Options</a></code> |             |

</section>

<section id="localstorageservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                     | Returns type                                                                                                                       | Description |
| ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [clear()](https://sheetbase.github.io/client/classes/localstorageservice.html#clear)                         | <code>Promise<void></code>                                                                                                         |             |
| [extend(storageConfigs)](https://sheetbase.github.io/client/classes/localstorageservice.html#extend)         | <code><a href="https://sheetbase.github.io/client/classes/localstorageservice.html" target="_blank">LocalstorageService</a></code> |             |
| [get(key)](https://sheetbase.github.io/client/classes/localstorageservice.html#get)                          | <code>Promise<null \| Data></code>                                                                                                 |             |
| [iterate(handler)](https://sheetbase.github.io/client/classes/localstorageservice.html#iterate)              | <code>Promise<unknown></code>                                                                                                      |             |
| [iterateKeys(handler)](https://sheetbase.github.io/client/classes/localstorageservice.html#iteratekeys)      | <code>Promise<void></code>                                                                                                         |             |
| [keys()](https://sheetbase.github.io/client/classes/localstorageservice.html#keys)                           | <code>Promise<string[]></code>                                                                                                     |             |
| [remove(key)](https://sheetbase.github.io/client/classes/localstorageservice.html#remove)                    | <code>Promise<void></code>                                                                                                         |             |
| [removeBulk(keys)](https://sheetbase.github.io/client/classes/localstorageservice.html#removebulk)           | <code>Promise<void></code>                                                                                                         |             |
| [removeByPrefix(prefix)](https://sheetbase.github.io/client/classes/localstorageservice.html#removebyprefix) | <code>Promise<void></code>                                                                                                         |             |
| [removeBySuffix(suffix)](https://sheetbase.github.io/client/classes/localstorageservice.html#removebysuffix) | <code>Promise<void></code>                                                                                                         |             |
| [set(key, data)](https://sheetbase.github.io/client/classes/localstorageservice.html#set)                    | <code>Promise<Data></code>                                                                                                         |             |

</section>

<section id="cacheservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                          | Returns type                                                                                                         | Description |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| [extend(storageConfigs)](https://sheetbase.github.io/client/classes/cacheservice.html#extend)                     | <code><a href="https://sheetbase.github.io/client/classes/cacheservice.html" target="_blank">CacheService</a></code> |             |
| [flush()](https://sheetbase.github.io/client/classes/cacheservice.html#flush)                                     | <code>Promise<void></code>                                                                                           |             |
| [flushExpired()](https://sheetbase.github.io/client/classes/cacheservice.html#flushexpired)                       | <code>Promise<void></code>                                                                                           |             |
| [get(key, refresher?, cacheTime?, keyBuilder?)](https://sheetbase.github.io/client/classes/cacheservice.html#get) | <code>Promise<null \| Data></code>                                                                                   |             |
| [iterate(handler)](https://sheetbase.github.io/client/classes/cacheservice.html#iterate)                          | <code>Promise<unknown></code>                                                                                        |             |
| [iterateKeys(handler)](https://sheetbase.github.io/client/classes/cacheservice.html#iteratekeys)                  | <code>Promise<void></code>                                                                                           |             |
| [remove(key)](https://sheetbase.github.io/client/classes/cacheservice.html#remove)                                | <code>Promise<void></code>                                                                                           |             |
| [removeBulk(keys)](https://sheetbase.github.io/client/classes/cacheservice.html#removebulk)                       | <code>Promise<void></code>                                                                                           |             |
| [removeByPrefix(prefix)](https://sheetbase.github.io/client/classes/cacheservice.html#removebyprefix)             | <code>Promise<void></code>                                                                                           |             |
| [removeBySuffix(suffix)](https://sheetbase.github.io/client/classes/cacheservice.html#removebysuffix)             | <code>Promise<void></code>                                                                                           |             |
| [set(key, data, cacheTime?)](https://sheetbase.github.io/client/classes/cacheservice.html#set)                    | <code>Promise<Data></code>                                                                                           |             |

</section>

<section id="fetchservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                               | Returns type                       | Description |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------- | ----------- |
| [delete(url, init?)](https://sheetbase.github.io/client/classes/fetchservice.html#delete)              | <code>Promise<Data></code>         |             |
| [fetch(input, init?, json?)](https://sheetbase.github.io/client/classes/fetchservice.html#fetch)       | <code>Promise<Data></code>         |             |
| [get(url, init?, json?, cacheTime?)](https://sheetbase.github.io/client/classes/fetchservice.html#get) | <code>Promise<null \| Data></code> |             |
| [patch(url, init?)](https://sheetbase.github.io/client/classes/fetchservice.html#patch)                | <code>Promise<Data></code>         |             |
| [post(url, init?)](https://sheetbase.github.io/client/classes/fetchservice.html#post)                  | <code>Promise<Data></code>         |             |
| [put(url, init?)](https://sheetbase.github.io/client/classes/fetchservice.html#put)                    | <code>Promise<Data></code>         |             |

</section>

<section id="apiservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                              | Returns type                                                                                                     | Description |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| [addBeforeHooks(hooks)](https://sheetbase.github.io/client/classes/apiservice.html#addbeforehooks)    | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code> |             |
| [addBody(body)](https://sheetbase.github.io/client/classes/apiservice.html#addbody)                   | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code> |             |
| [addQuery(query)](https://sheetbase.github.io/client/classes/apiservice.html#addquery)                | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code> |             |
| [delete(endpoint?, query?, body?)](https://sheetbase.github.io/client/classes/apiservice.html#delete) | <code>Promise<Data></code>                                                                                       |             |
| [error(value)](https://sheetbase.github.io/client/classes/apiservice.html#error)                      | <code>Promise<unknown></code>                                                                                    |             |
| [extend()](https://sheetbase.github.io/client/classes/apiservice.html#extend)                         | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code> |             |
| [get(endpoint?, query?, cacheTime?)](https://sheetbase.github.io/client/classes/apiservice.html#get)  | <code>Promise<null \| Data></code>                                                                               |             |
| [info(value)](https://sheetbase.github.io/client/classes/apiservice.html#info)                        | <code>Promise<unknown></code>                                                                                    |             |
| [log(value)](https://sheetbase.github.io/client/classes/apiservice.html#log)                          | <code>Promise<unknown></code>                                                                                    |             |
| [logging(value, level?)](https://sheetbase.github.io/client/classes/apiservice.html#logging)          | <code>Promise<unknown></code>                                                                                    |             |
| [patch(endpoint?, query?, body?)](https://sheetbase.github.io/client/classes/apiservice.html#patch)   | <code>Promise<Data></code>                                                                                       |             |
| [post(endpoint?, query?, body?)](https://sheetbase.github.io/client/classes/apiservice.html#post)     | <code>Promise<Data></code>                                                                                       |             |
| [put(endpoint?, query?, body?)](https://sheetbase.github.io/client/classes/apiservice.html#put)       | <code>Promise<Data></code>                                                                                       |             |
| [request(inputs?)](https://sheetbase.github.io/client/classes/apiservice.html#request)                | <code>Promise<null \| Data></code>                                                                               |             |
| [setData(data)](https://sheetbase.github.io/client/classes/apiservice.html#setdata)                   | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code> |             |
| [setEndpoint(endpoint)](https://sheetbase.github.io/client/classes/apiservice.html#setendpoint)       | <code><a href="https://sheetbase.github.io/client/classes/apiservice.html" target="_blank">ApiService</a></code> |             |
| [system()](https://sheetbase.github.io/client/classes/apiservice.html#system)                         | <code>Promise<null \| Data></code>                                                                               |             |
| [warn(value)](https://sheetbase.github.io/client/classes/apiservice.html#warn)                        | <code>Promise<unknown></code>                                                                                    |             |

</section>

<section id="databaseservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                                                  | Returns type                                                                                                               | Description |
| ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- |
| [add(sheet, key, data)](https://sheetbase.github.io/client/classes/databaseservice.html#add)                                              | <code>Promise<unknown></code>                                                                                              |             |
| [all(sheet, cacheTime?)](https://sheetbase.github.io/client/classes/databaseservice.html#all)                                             | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [clearCachedAll(input)](https://sheetbase.github.io/client/classes/databaseservice.html#clearcachedall)                                   | <code>void</code>                                                                                                          |             |
| [clearCachedContent(cachedInput)](https://sheetbase.github.io/client/classes/databaseservice.html#clearcachedcontent)                     | <code>Promise<void></code>                                                                                                 |             |
| [clearCachedItem(sheet, key)](https://sheetbase.github.io/client/classes/databaseservice.html#clearcacheditem)                            | <code>Promise<void></code>                                                                                                 |             |
| [commenting(sheet, key)](https://sheetbase.github.io/client/classes/databaseservice.html#commenting)                                      | <code>Promise<unknown></code>                                                                                              |             |
| [direct()](https://sheetbase.github.io/client/classes/databaseservice.html#direct)                                                        | <code><a href="https://sheetbase.github.io/client/classes/directobject.html" target="_blank">DirectObject</a></code>       |             |
| [docsContent(docId, docsStyle?, cacheTime?)](https://sheetbase.github.io/client/classes/databaseservice.html#docscontent)                 | <code>Promise<null \| string></code>                                                                                       |             |
| [increase(sheet, key, increasing)](https://sheetbase.github.io/client/classes/databaseservice.html#increase)                              | <code>Promise<unknown></code>                                                                                              |             |
| [indirect()](https://sheetbase.github.io/client/classes/databaseservice.html#indirect)                                                    | <code><a href="https://sheetbase.github.io/client/classes/indirectobject.html" target="_blank">IndirectObject</a></code>   |             |
| [item(sheet, finder, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#item)                                     | <code>Promise<null \| Item></code>                                                                                         |             |
| [items(sheet, filter?, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#items)                                  | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsArchived(sheet, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsarchived)                           | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByAuthor(sheet, authorKey, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbyauthor)                | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByCategory(sheet, categoryKey, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbycategory)          | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByKeyword(sheet, keyword, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbykeyword)                | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByLocale(sheet, locale, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbylocale)                   | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByMetaEquals(sheet, metaKey, equalTo, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbymetaequals) | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByMetaExists(sheet, metaKey, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbymetaexists)          | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByOrigin(sheet, origin, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbyorigin)                   | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByParent(sheet, parentKey, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbyparent)                | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByRelated(sheet, baseItem, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbyrelated)               | <code>Promise<Item[]></code>                                                                                               |             |
| [itemsByTag(sheet, tagKey, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbytag)                         | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByTerm(sheet, taxonomy, termKey, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbyterm)            | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByType(sheet, type, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbytype)                         | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsByTypeDefault(sheet, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsbytypedefault)                 | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsDraft(sheet, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsdraft)                                 | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsOriginal(sheet, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemsoriginal)                           | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [itemsPublished(sheet, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#itemspublished)                         | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [jsonContent(url, cacheTime?)](https://sheetbase.github.io/client/classes/databaseservice.html#jsoncontent)                               | <code>Promise<null \| Data></code>                                                                                         |             |
| [liking(sheet, key)](https://sheetbase.github.io/client/classes/databaseservice.html#liking)                                              | <code>Promise<unknown></code>                                                                                              |             |
| [query(sheet, filter, options?)](https://sheetbase.github.io/client/classes/databaseservice.html#query)                                   | <code>Promise<null \| Item[]></code>                                                                                       |             |
| [rating(sheet, key, stars)](https://sheetbase.github.io/client/classes/databaseservice.html#rating)                                       | <code>Promise<unknown></code>                                                                                              |             |
| [registerDataParser(parser)](https://sheetbase.github.io/client/classes/databaseservice.html#registerdataparser)                          | <code><a href="https://sheetbase.github.io/client/classes/databaseservice.html" target="_blank">DatabaseService</a></code> |             |
| [remove(sheet, key)](https://sheetbase.github.io/client/classes/databaseservice.html#remove)                                              | <code>Promise<unknown></code>                                                                                              |             |
| [set(sheet, key, data)](https://sheetbase.github.io/client/classes/databaseservice.html#set)                                              | <code>Promise<unknown></code>                                                                                              |             |
| [setSegmentation(globalSegment)](https://sheetbase.github.io/client/classes/databaseservice.html#setsegmentation)                         | <code><a href="https://sheetbase.github.io/client/classes/databaseservice.html" target="_blank">DatabaseService</a></code> |             |
| [sharing(sheet, key, providers?)](https://sheetbase.github.io/client/classes/databaseservice.html#sharing)                                | <code>Promise<unknown></code>                                                                                              |             |
| [textContent(url, cacheTime?)](https://sheetbase.github.io/client/classes/databaseservice.html#textcontent)                               | <code>Promise<null \| string></code>                                                                                       |             |
| [update(sheet, key, data)](https://sheetbase.github.io/client/classes/databaseservice.html#update)                                        | <code>Promise<unknown></code>                                                                                              |             |
| [viewing(sheet, key)](https://sheetbase.github.io/client/classes/databaseservice.html#viewing)                                            | <code>Promise<unknown></code>                                                                                              |             |

</section>

<section id="storageservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                                          | Returns type                           | Description |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| [info(id, cacheTime?)](https://sheetbase.github.io/client/classes/storageservice.html#info)                                       | <code>Promise<null \| FileInfo></code> |             |
| [read(\_file)](https://sheetbase.github.io/client/classes/storageservice.html#read)                                               | <code>Promise<FileReaderResult></code> |             |
| [remove(id)](https://sheetbase.github.io/client/classes/storageservice.html#remove)                                               | <code>Promise<object></code>           |             |
| [update(id, data)](https://sheetbase.github.io/client/classes/storageservice.html#update)                                         | <code>Promise<object></code>           |             |
| [upload(fileData, customFolder?, renamePolicy?, sharing?)](https://sheetbase.github.io/client/classes/storageservice.html#upload) | <code>Promise<FileInfo></code>         |             |
| [uploadMultiple(uploadResources)](https://sheetbase.github.io/client/classes/storageservice.html#uploadmultiple)                  | <code>Promise<FileInfo[]></code>       |             |

</section>

<section id="mailservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                             | Returns type                                  | Description |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| [quota()](https://sheetbase.github.io/client/classes/mailservice.html#quota)                                         | <code>Promise<null \| MailingQuota></code>    |             |
| [send(mailingData, category?, template?, silent?)](https://sheetbase.github.io/client/classes/mailservice.html#send) | <code>Promise<MailSentResult></code>          |             |
| [threads(category?)](https://sheetbase.github.io/client/classes/mailservice.html#threads)                            | <code>Promise<null \| MailingThread[]></code> |             |

</section>

<section id="authservice" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

| Function                                                                                                                                      | Returns type                                                                                                             | Description |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| [checkActionCode(code)](https://sheetbase.github.io/client/classes/authservice.html#checkactioncode)                                          | <code>Promise<unknown></code>                                                                                            |             |
| [confirmPasswordReset(code, newPassword)](https://sheetbase.github.io/client/classes/authservice.html#confirmpasswordreset)                   | <code>Promise<unknown></code>                                                                                            |             |
| [createUserWithEmailAndPassword(email, password)](https://sheetbase.github.io/client/classes/authservice.html#createuserwithemailandpassword) | <code>Promise<object></code>                                                                                             |             |
| [facebookAuthProvider()](https://sheetbase.github.io/client/classes/authservice.html#facebookauthprovider)                                    | <code><a href="https://sheetbase.github.io/client/classes/providerobject.html" target="_blank">ProviderObject</a></code> |             |
| [googleAuthProvider()](https://sheetbase.github.io/client/classes/authservice.html#googleauthprovider)                                        | <code><a href="https://sheetbase.github.io/client/classes/providerobject.html" target="_blank">ProviderObject</a></code> |             |
| [onAuthStateChanged(next)](https://sheetbase.github.io/client/classes/authservice.html#onauthstatechanged)                                    | <code>void</code>                                                                                                        |             |
| [sendPasswordResetEmail(email)](https://sheetbase.github.io/client/classes/authservice.html#sendpasswordresetemail)                           | <code>Promise<unknown></code>                                                                                            |             |
| [signInAnonymously()](https://sheetbase.github.io/client/classes/authservice.html#signinanonymously)                                          | <code>Promise<object></code>                                                                                             |             |
| [signInWithCustomToken(token)](https://sheetbase.github.io/client/classes/authservice.html#signinwithcustomtoken)                             | <code>Promise<object></code>                                                                                             |             |
| [signInWithEmailAndPassword(email, password)](https://sheetbase.github.io/client/classes/authservice.html#signinwithemailandpassword)         | <code>Promise<object></code>                                                                                             |             |
| [signInWithPopup(provider)](https://sheetbase.github.io/client/classes/authservice.html#signinwithpopup)                                      | <code>Promise<void></code>                                                                                               |             |
| [signOut()](https://sheetbase.github.io/client/classes/authservice.html#signout)                                                              | <code>Promise<void></code>                                                                                               |             |
| [verifyPasswordResetCode(code)](https://sheetbase.github.io/client/classes/authservice.html#verifypasswordresetcode)                          | <code>Promise<unknown></code>                                                                                            |             |

</section>
