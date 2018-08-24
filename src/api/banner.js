/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  get (params) {
    return Vue.axios.get('/api/banners', { params })
  },

  getBySlug (slug) {
    return Vue.axios.get('/api/banners/' + slug)
  }
}
