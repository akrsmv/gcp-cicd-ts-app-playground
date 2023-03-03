
const endpoints = require('./api-endpoints.json')
const env = require('./gct-env.json').current

export const GCT_API = endpoints[env]["gct_api"]
