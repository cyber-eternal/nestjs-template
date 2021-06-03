export default {
  'c24f4350-aefa-11eb-8529-0242ac130003': {
    // the key is an ID of DocSync module
    docSyncUrl: process.env.DOC_SYNC_1_URL,
    downloadPath: process.env.DOC_SYNC_1_DOWNLOAD_PATH || 'api/download',
    cleanCachePath:
      process.env.DOC_SYNC_1_CLEAN_CACHE_PATH || 'api/cache/clean',
    gatewayApiKey: process.env.DOC_SYNC_1_GATEWAY_API_KEY || '',
  },
};
