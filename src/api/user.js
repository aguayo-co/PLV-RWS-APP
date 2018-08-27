/**
 * API Calls related to users and their properties
 */
import Vue from 'vue'

export default {
  basePath: '/api/users',
  update (data) {
    return Vue.axiosAuth.patch('/api/users/' + data.id, data)
  },
  updateWithFile (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      formData.append(key, data[key])
    })
    formData.id = data.id
    return this.update(formData)
  },
  create (data) {
    var formData = new FormData()
    Object.keys(data).forEach((key, index) => {
      formData.append(key, data[key])
    })
    return Vue.axios.post('/api/users', formData)
  },

  login (user) {
    const payload = {
      email: user.email,
      password: user.password
    }
    return Vue.axios.post('/api/users/login', payload)
  },

  passwordRecovery (email) {
    return Vue.axios.get('/api/users/password/recovery/' + email)
  },

  validateToken (token, email) {
    const data = {
      token: token
    }
    return Vue.axios.post('/api/users/password/recovery/' + email, data)
  },

  passwordChange (token, email, password) {
    const data = {
      token: token,
      password: password
    }
    return Vue.axios.post('/api/users/password/reset/' + email, data)
  },

  checkEmail (email) {
    const params = {
      email: email
    }
    return Vue.axios.get('/api/users', { params })
  },

  load (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId)
  },

  delete (userId) {
    return Vue.axiosAuth.delete('/api/users/' + userId)
  },

  getAll () {
    return Vue.axios.get('/api/users')
  },

  get (params) {
    return Vue.axios.get('/api/users', { params })
  },

  getUsersByGroup (groupId) {
    return Vue.axios.get('/api/users/?filter[group_ids]=' + groupId)
  },

  getUserById (userId) {
    return Vue.axios.get('/api/users/' + userId)
  }
}
