/**
 * API Calls related to shopping cart
 */
import Vue from 'vue'

export default {
  load: function () {
    return Vue.axiosAuth.get('/api/shopping_cart')
  }
}
