const fs = require('fs')

const vueHost = process.env.VUE_HOST ? process.env.VUE_HOST.replace(/\/$/g, '') : null
const vuePort = process.env.VUE_PORT || null
const vueUrl = vueHost && vuePort ? vueHost + ':' + vuePort : null
const gaTracking = process.env.GA_TRACKING || null
const mcUrl = process.env.MC_URL || null

const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL.replace(/\/$/g, ''),
  GA_TRACKING: gaTracking,
  MC_URL: mcUrl,
  VUE_HOST: vueHost,
  VUE_PORT: vuePort,
  VUE_URL: vueUrl
}

const devServer = {
  https: true
}

if (process.env.PUBLIC) {
  devServer.public = process.env.PUBLIC
}

if (process.env.KEY_PATH && process.env.CERT_PATH) {
  devServer.https = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
  }
}

module.exports = {
  pluginOptions: {
    env
  },
  devServer
}
