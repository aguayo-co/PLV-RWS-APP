/**
 * API Calls related to Shipping Methods and their properties
 */
import Vue from 'vue'

export default {
  getAllMethods: function () {
    return Vue.axios.get('/api/shipping_methods')
  }
}
