/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  basePath: '/api/credits_transactions',
  all () {
    const params = {
      orderby: '-created_at'
    }
    return Vue.axiosAuth.get('/api/credits_transactions', { params })
  },
  pending () {
    const params = {
      items: 1000,
      'filter[transfer_status]': 0
    }
    return Vue.axiosAuth.get('/api/credits_transactions', { params })
  },
  transferRequest: function (data) {
    const payload = {
      user_id: data.user_id,
      amount: data.amount,
      transfer_status: data.transfer_status,
      extra: data.extra
    }
    return Vue.axiosAuth.post('/api/credits_transactions', payload)
  }
}
