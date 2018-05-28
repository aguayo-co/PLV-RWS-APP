/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  all (userId, page = 1) {
    const params = {
      page
    }
    return Vue.axiosAuth.get('/api/credits_transactions', {params})
  }
}
