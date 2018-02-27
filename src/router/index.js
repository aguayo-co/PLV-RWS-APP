import Vue from 'vue'
import Router from 'vue-router'
import FormPass from '@/pages/FormPass'
import FormSingUp from '@/pages/FormSingUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/SingUp',
      name: 'FormPass',
      component: FormSingUp
    },
    {
      path: '/password',
      name: 'FormSingUp',
      component: FormPass
    }
  ]
})
