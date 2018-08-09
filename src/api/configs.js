/**
 * API Calls related to configurations
 */
import Vue from 'vue'

export default {
  getAll () {
    return Vue.axios.get('/api/configs')
  }
}
