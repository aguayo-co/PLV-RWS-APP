/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getAllBanners: function () {
    return Vue.axios.get('/api/banners')
  },

  getBannerBySlug: function (slug) {
    return Vue.axios.get('/api/banners?filter[slug]=' + slug)
  }
}
