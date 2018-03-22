'use strict'
const apiDomain = 'https://prilov.com/'
module.exports = {
  NODE_ENV: JSON.stringify('production'),
  API_DOMAIN: JSON.stringify(apiDomain),
  API_URL: JSON.stringify(apiDomain + '/api')
}
