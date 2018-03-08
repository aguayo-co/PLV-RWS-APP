// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMq from 'vue-mq'

Vue.config.productionTip = false

/* Setup breakpoints */
Vue.use(VueMq, {
  breakpoints: {
    small: 580,
    medium: 1024,
    large: Infinity
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
