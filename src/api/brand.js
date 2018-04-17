/**
 * API Calls related to brands and their properties
 */
import Vue from 'vue'

export default {
  getAllBrands: function () {
    return Vue.axios.get('/api/brands')
  },

  getBrandBySlug: function (slug) {
    return Vue.axios.get('/api/brands?filter[slug]=' + slug)
  }
}
