/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getAllSlides: function () {
    return Vue.axios.get('/api/sliders')
  }
}
