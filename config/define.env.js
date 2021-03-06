'use strict'

const vueHost = process.env.VUE_HOST ? process.env.VUE_HOST.replace(/\/$/g, '') : null
const vuePort = process.env.VUE_PORT || null
const vueUrl = vueHost && vuePort ? vueHost + ':' + vuePort : null
const gaTracking = process.env.GA_TRACKING || null

module.exports = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  API_URL: JSON.stringify(process.env.API_URL.replace(/\/$/g, '')),
  GA_TRACKING: JSON.stringify(gaTracking),
  VUE_HOST: JSON.stringify(vueHost),
  VUE_PORT: JSON.stringify(vuePort),
  VUE_URL: JSON.stringify(vueUrl)
}
