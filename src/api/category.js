/**
 * API Calls related to brands and their properties
 */
import Vue from 'vue'

export default {
  getAllCategories: function () {
    return Vue.axios.get('/api/categories')
  },

  getCategoryBySlug: function (slug) {
    return Vue.axios.get('/api/categories?filter[slug]=' + slug)
  }
}
