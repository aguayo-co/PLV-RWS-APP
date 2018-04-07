/**
 * API Calls related to user addresses
 */
import Vue from 'vue'

export default {
  getRegions: function () {
    return Vue.axios.get('/api/regions/')
  },

  update: function (data) {
    if (data.user_id === null) {
      return Promise.reject(new Error('Need the address User ID.'))
    }
    if (data.id === null) {
      return Promise.reject(new Error('Need the address ID.'))
    }
    const payload = {...data}
    return Vue.axiosAuth.patch('/api/users/' + data.user_id + '/addresses/' + data.id, payload)
  },

  create: function (data) {
    if (data.user_id === null) {
      return Promise.reject(new Error('Need the address User ID.'))
    }

    const payload = {
      address: data.address,
      region: data.region,
      city: data.city,
      zone: data.zone
    }

    return Vue.axiosAuth.post('/api/users/' + data.user_id + '/addresses', payload)
  },

  load: function (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId + '/addresses')
  },

  delete: function (data) {
    return Vue.axiosAuth.delete('/api/users/' + data.user_id + '/addresses/' + data.id)
  }
}
