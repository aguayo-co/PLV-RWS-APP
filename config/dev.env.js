'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const apiDomain = 'https://prilov.aguayo.co'
module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  API_DOMAIN: JSON.stringify(apiDomain),
  API_URL: JSON.stringify(apiDomain + '/api')
})
