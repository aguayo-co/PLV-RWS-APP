/**
 * API Calls related to orders
 */
import Vue from 'vue'

export default {
  load (id) {
    return Vue.axiosAuth.get('/api/orders/' + id)
  }
}
