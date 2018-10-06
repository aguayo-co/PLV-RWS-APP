/**
 * API Calls related to user addresses
 */
import Vue from 'vue'

export default {
  getRegions: function () {
    return Vue.axios.get('/api/regions')
  },

  update (data) {
    if (data.user_id === null) {
      return Promise.reject(new Error('Need the address User ID.'))
    }
    if (data.id === null) {
      return Promise.reject(new Error('Need the address ID.'))
    }
    const payload = { ...data }
    return Vue.axiosAuth.patch('/api/users/' + data.user_id + '/addresses/' + data.id, payload)
  },

  create (data) {
    if (data.user_id === null) {
      return Promise.reject(new Error('Need the address User ID.'))
    }

    const payload = {
      number: data.number,
      street: data.street,
      additional: data.additional,
      commune: data.commune
    }

    return Vue.axiosAuth.post('/api/users/' + data.user_id + '/addresses', payload)
  },

  load (userId) {
    return Vue.axiosAuth.get('/api/users/' + userId + '/addresses')
  },

  delete (data) {
    return Vue.axiosAuth.delete('/api/users/' + data.user_id + '/addresses/' + data.id)
  }
}
