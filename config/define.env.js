'use strict'
module.exports = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  API_URL: JSON.stringify(process.env.API_URL.replace(/\/$/g, '')),
  VUE_HOST: JSON.stringify(process.env.VUE_HOST.replace(/\/$/g, '')),
  VUE_PORT: JSON.stringify(process.env.VUE_PORT),
  VUE_URL: JSON.stringify(process.env.VUE_HOST.replace(/\/$/g, '') + ':' + process.env.VUE_PORT)
}
