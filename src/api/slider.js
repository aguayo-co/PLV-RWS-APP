/**
 * API Calls related to products and their properties
 */
import Vue from 'vue'

export default {
  getActiveSlides () {
    const params = {
      'filter[priority]': '1,100',
      orderby: 'priority'
    }
    return Vue.axios.get('/api/sliders', { params })
  }
}
