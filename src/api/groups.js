/**
 * API Calls related to groups
 */
import Vue from 'vue'

export default {
  getAll () {
    return Vue.axios.get('/api/groups')
  },
  getBySlug (slug) {
    return Vue.axios.get('/api/groups/' + slug)
  }
}
