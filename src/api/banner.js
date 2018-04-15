/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getAllBanners: function () {
    return Vue.axios.get('/api/banners')
  }
}
