/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
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
  }
}
