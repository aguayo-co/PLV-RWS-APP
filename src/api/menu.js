/**
 * API Calls related to menus and their properties
 */
import Vue from 'vue'

export default {
  getMenuByName: function (name) {
    name = name || ''
    return Vue.axios.get('/api/menus/' + name)
  }
}
