/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  update: function (data) {
    if (window.localStorage.getItem('userId') === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    if (data.id === null) {
      return Promise.reject(new Error('Need a user ID.'))
    }
    const payload = {...data}
    return Vue.axiosAuth.patch('/api/users/' + data.id, payload)
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

  login: function (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  load: function () {
    const userId = window.localStorage.getItem('userId')
    if (userId === null || window.localStorage.getItem('token') === null) {
      return Promise.reject(new Error('No credentials founds.'))
    }
    return Vue.axiosAuth.get('/api/users/' + userId)
  }
}
