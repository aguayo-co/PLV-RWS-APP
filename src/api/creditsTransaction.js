/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  all () {
    const params = {
      orderby: '-created_at'
    }
    return Vue.axiosAuth.get('/api/credits_transactions', {params})
  },
  pending () {
    const params = {
      items: 1000,
      'filter[transfer_status]': 0
    }
    return Vue.axiosAuth.get('/api/credits_transactions', {params})
  }
}
