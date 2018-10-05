const fs = require('fs')

const vueHost = process.env.VUE_HOST ? process.env.VUE_HOST.replace(/\/$/g, '') : null
const vuePort = process.env.VUE_PORT || null
const vueUrl = vueHost && vuePort ? vueHost + ':' + vuePort : null
const gaTracking = process.env.GA_TRACKING || null
const mcUrl = process.env.MC_URL || null
const sentryDsn = process.env.SENTRY_DSN || null

const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL.replace(/\/$/g, ''),
  // Google analytics tracking code.
  GA_TRACKING: gaTracking,
  // MailChimp registration URL.
  MC_URL: mcUrl,
  // Sentry error tracking configuration.
  SENTRY_DSN: sentryDsn,
  // Vue DevTools connection settings.
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
  devServer,
  configureWebpack: {
    resolve: {
      alias: {
        flickity$: 'flickity-imagesloaded'
      }
    }
  }
}
