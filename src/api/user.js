/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  update: function (data) {
    return Vue.axiosAuth.patch('/api/users/' + data.id, data)
  },
  updateWithFile: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      formData.append(key, data[key])
    })
    formData.id = data.id
    return this.update(formData)
  },
  create: function (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      formData.append(key, data[key])
    })
    return Vue.axios.post('/api/users', formData)
  },

  login: function (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  passwordRecovery: function (email) {
    return Vue.axios.get('/api/users/password/recovery/' + email)
  },

  validateToken: function (token, email) {
    const data = {
      token: token
    }
    return Vue.axios.post('/api/users/password/recovery/' + email, data)
  },

  passwordChange: function (token, email, password) {
    const data = {
      token: token,
      password: password
    }
    return Vue.axios.post('/api/users/password/reset/' + email, data)
  },

  checkEmail: function (email) {
    const params = {
      email: email
    }
    return Vue.axios.get('/api/users', { params })
  },

  load: function (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId)
  },

  getAll: function () {
    return Vue.axios.get('/api/users')
  },

  get: function (params) {
    return Vue.axios.get('/api/users', { params })
  },

  getUsersByGroup: function (groupId) {
    return Vue.axios.get('/api/users/?filter[group_ids]=' + groupId)
  },

  getUserById: function (userId) {
    return Vue.axios.get('/api/users/' + userId)
  },

  // Transacción de créditos
  creditWithdrawal: function (data) {
    const payload = {
      user_id: data.user_id,
      amount: data.amount,
      transfer_status: data.transfer_status,
      extra: data.extra
    }
    return Vue.axiosAuth.post('/api/credits_transactions', payload)
  }
}
