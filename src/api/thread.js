/**
 * API Calls related to threads and their properties
 */
import Vue from 'vue'

export default {
  get: function (page, items, filter) {
    let queryFilter = ''
    page = page || 1
    items = items || 8

    if (filter) {
      Object.keys(filter).forEach((key) => {
        queryFilter += '&filter[' + key + ']=' + filter[key]
      })
    }
    console.log('/api/banners?items=' + items + '&page=' + page + queryFilter)
    return Vue.axiosAuth.get('/api/banners?items=' + items + '&page=' + page + queryFilter)
  },

  getByProduct: function (productId) {
    return Vue.axios.get('/api/threads?filter[product_id]=' + productId)
  },

  create: function (data) {
    return Vue.axiosAuth.post('/api/threads', data)
  },

  createMessage: function (data) {
    return Vue.axiosAuth.post('/api/threads/' + data.thread_id + '/messages', data)
  }
}
