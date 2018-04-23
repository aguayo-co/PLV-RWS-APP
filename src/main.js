// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueMqMixin from '@/Mixin/VueMq-mixin'

import App from './App'
import axiosPlugin from './axios'
import prilovHelpers from './helpers'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* View Media query */
Vue.use(VueMqMixin)

// Load global Axios instances.
Vue.use(axiosPlugin, store)

// Load our helpers!
Vue.use(prilovHelpers)

Vue.filter('currency', function (value) {
  if (value) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
})
Vue.filter('date', function (value) {
  return value ? new Date(value).toLocaleDateString() : ''
})
Vue.filter('address', function (address) {
  return address.address + ', ' + address.region + ', ' + address.city + ', ' + address.zone
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  store.dispatch('ui/closeModal')
  store.dispatch('ui/closeAllDropdowns')
  next()
})
