/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  update: function (user) {
    const payload = {...user}
    return Vue.axiosAuth.patch('/api/users/' + user.id, payload)
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
    return new Promise((resolve, reject) => {
      const userId = window.localStorage.getItem('userId')
      const token = window.localStorage.getItem('token')
      if (window.localStorage.getItem('userId') === null || window.localStorage.getItem('token') === null) {
        reject(new Error('No credentials founds.'))
        return
      }
      resolve(userId, token)
    }).then((userId, token) => {
      return Vue.axiosAuth.get('/api/users/' + userId)
    })
  }
}
