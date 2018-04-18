'use strict'
module.exports = {
  NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  API_URL: JSON.stringify(process.env.API_URL.replace(/\/$/g, ''))
}
