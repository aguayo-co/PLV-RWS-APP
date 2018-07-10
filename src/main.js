import 'moment/locale/es'

import moment from 'moment'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMoment from 'vue-moment'
import VueTextareaAutosize from 'vue-textarea-autosize'

import VueMqMixin from '@/Mixin/VueMq-mixin'

import App from './App'
import axiosPlugin from './axios'
import prilovHelpers from './helpers'
import prilovFilters from './filters'
import router from './router'
import store from './store'
import CountDown from './components/global/CountDown'
import Loader from './components/global/Loader'
import Dots from './components/global/Dots'

(() => {
  if (window.location.protocol === 'http:') {
    window.location.protocol = 'https:'
    return
  }

  /* View Media query */
  Vue.use(VueMqMixin)

  Vue.use(VueMoment, {moment})

  // Load global Axios instances.
  Vue.use(axiosPlugin, store)

  // Load our helpers!
  Vue.use(prilovHelpers)

  // Load our filters!
  Vue.use(prilovFilters)

  Vue.use(VueTextareaAutosize)

  Vue.component('Loader', Loader)
  Vue.component('Dots', Dots)
  Vue.component('CountDown', CountDown)

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})()
