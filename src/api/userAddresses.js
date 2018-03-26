/**
 * API Calls related to user addresses
 */
import Vue from 'vue'

export default {
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

  create: function (user) {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password
    }

    return Vue.axios.post('/api/users', payload)
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
