/**
 * API Calls related to user addresses
 */
import Vue from 'vue'

export default {
  getRegions: function () {
    return Vue.axios.get('/api/regions/')
  },

  update: function (data) {
    if (window.localStorage.getItem('userId') === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
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
    const userId = window.localStorage.getItem('userId')
    if (userId === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    const payload = {
      address: data.address,
      region: data.region,
      zone: data.zone
    }

    return Vue.axiosAuth.post('/api/users/' + userId + '/addresses', payload)
  },

  load: function () {
    const userId = window.localStorage.getItem('userId')
    if (userId === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    return Vue.axiosAuth.get('/api/users/' + userId + '/addresses')
  },

  delete: function (data) {
    if (window.localStorage.getItem('userId') === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    if (data.user_id === null) {
      return Promise.reject(new Error('Need the address User ID.'))
    }
    if (data.id === null) {
      return Promise.reject(new Error('Need the address ID.'))
    }
    return Vue.axiosAuth.delete('/api/users/' + data.user_id + '/addresses/' + data.id)
  }
}
