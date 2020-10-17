module.exports = {
  fileRender: {
    'README.md': {
      rendering: {
        head: true,
        options: ['Options', 'SUMMARY_PROPERTIES'],
        appobject: ['AppObject', 'FULL'],
        helperservice: ['HelperService', 'SUMMARY_METHODS'],
        optionservice: ['OptionService', 'SUMMARY_METHODS'],
        localstorageservice: ['LocalstorageService', 'SUMMARY_METHODS'],
        cacheservice: ['CacheService', 'SUMMARY_METHODS'],
        fetchservice: ['FetchService', 'SUMMARY_METHODS'],
        apiservice: ['ApiService', 'SUMMARY_METHODS'],
        databaseservice: ['DatabaseService', 'SUMMARY_METHODS'],
        storageservice: ['StorageService', 'SUMMARY_METHODS'],
        mailservice: ['MailService', 'SUMMARY_METHODS'],
        authservice: ['AuthService', 'SUMMARY_METHODS'],
        license: true
      }
    }
  }
};
