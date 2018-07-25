/**
 * API Calls related to campaigns
 */
import Vue from 'vue'

export default {
  getBySlug (slug) {
    return Vue.axios.get('/api/campaigns/' + slug)
  }
}
