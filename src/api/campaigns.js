/**
 * API Calls related to campaigns
 */
import Vue from 'vue'

export default {
  getAll () {
    return Vue.axios.get('/api/campaigns')
  },
  getBySlug (slug) {
    return Vue.axios.get('/api/campaigns/' + slug)
  }
}
