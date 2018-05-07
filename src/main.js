// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueMqMixin from '@/Mixin/VueMq-mixin'

import App from './App'
import axiosPlugin from './axios'
import prilovHelpers from './helpers'
import router from './router'
import store from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false

/* View Media query */
Vue.use(VueMqMixin)

Vue.use(require('vue-moment'))

// Load global Axios instances.
Vue.use(axiosPlugin, store)

// Load our helpers!
Vue.use(prilovHelpers)

Vue.use(VueTextareaAutosize)

Vue.filter('currency', function (value) {
  if (value) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
})
Vue.filter('date', function (value) {
  return value ? new Date(value).toLocaleDateString() : ''
})
Vue.filter('address', function (address) {
  return address.number + ' ' + address.street + ', ' + address.additional + ' - ' + address.region + ', ' + address.province + ', ' + address.commune
})
Vue.filter('full_name', function (user) {
  return user.first_name + ' ' + user.last_name
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
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = 'Prilov — ' + nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (nearestWithMeta) {
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
      // Add the meta tags to the document head.
      .forEach(tag => document.head.appendChild(tag))
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (window.localStorage.getItem('userId')) {
      next()
    } else {
      next({
        path: '/acceso-denegado',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})
