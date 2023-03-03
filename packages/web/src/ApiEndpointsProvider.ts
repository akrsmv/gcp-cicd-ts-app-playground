
const endpoints = require('./api-endpoints.json')
export const GCT_API = endpoints[String(process.env.REACT_APP_GCT_ENV  ?? "LOCALDEV")]["gct_api"]
