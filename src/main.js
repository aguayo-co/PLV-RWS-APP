// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMqMixin from '@/Mixin/VueMq-mixin'
import store from './store'

Vue.config.productionTip = false

/* View Media query */
Vue.use(VueMqMixin)

Vue.filter('currency', function (value) {
  if (value) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
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
  next()
})
