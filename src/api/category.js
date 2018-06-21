/**
 * API Calls related to brands and their properties
 */
import Vue from 'vue'

export default {
  getAll: function () {
    return Vue.axios.get('/api/categories')
  }
}
