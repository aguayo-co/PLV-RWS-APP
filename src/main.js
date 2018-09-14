import 'moment/locale/es'

import './scss/main.scss'

import moment from 'moment'
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Croppa from 'vue-croppa'
import VueMoment from 'vue-moment'
import VueTextareaAutosize from 'vue-textarea-autosize'

import App from './App'
import VueMqMixin from './Mixin/VueMq-mixin'
import axiosPlugin from './axios'
import CountDown from './components/global/CountDown'
import Dots from './components/global/Dots'
import Loader from './components/global/Loader'
import prilovFilters from './filters'
import prilovHelpers from './helpers'
import router from './router'
import store from './store'

(() => {
  if (window.location.protocol === 'http:') {
    window.location.protocol = 'https:'
    return
  }

  Vue.config.productionTip = false

  /* View Media query */
  Vue.use(VueMqMixin)

  Vue.use(VueMoment, {moment})

  // Vue Analytics Plugin
  if (process.env.GA_TRACKING) {
    Vue.use(VueAnalytics, {
      id: process.env.GA_TRACKING,
      router
    })
  }

  // Load global Axios instances.
  Vue.use(axiosPlugin, store)

  // Load our helpers!
  Vue.use(prilovHelpers)

  // Load our filters!
  Vue.use(prilovFilters, store)

  Vue.use(VueTextareaAutosize)

  Vue.component('Loader', Loader)
  Vue.component('Dots', Dots)
  Vue.component('CountDown', CountDown)
  Vue.component('croppa', Croppa.component)

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
