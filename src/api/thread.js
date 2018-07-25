/**
 * API Calls related to threads and their properties
 */
import Vue from 'vue'

export default {
  get (page, items, filter) {
    const params = {
      page: page || 1,
      items: items || 8
    }

    if (filter) {
      Object.keys(filter).forEach((key) => {
        params['filter[' + key + ']'] = filter[key]
      })
    }
    return Vue.axiosAuth.get('/api/threads', { params })
  },

  getByProduct (productId) {
    const params = {
      'filter[product_id]': productId
    }
    return Vue.axios.get('/api/threads', { params })
  },

  getThreadById (threadId) {
    return Vue.axiosAuth.get('/api/threads/' + threadId)
  },

  getPrivateWith (userId) {
    const params = {
      'filter[private_with]': userId
    }
    return Vue.axiosAuth.get('/api/threads', { params })
  },

  create (data) {
    return Vue.axiosAuth.post('/api/threads', data)
  },

  createMessage (data) {
    return Vue.axiosAuth.post('/api/threads/' + data.thread_id + '/messages', data)
  }
}
