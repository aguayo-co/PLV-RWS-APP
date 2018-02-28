import Vue from 'vue'
import Router from 'vue-router'
import FormPass from '@/pages/FormPass'
import FormSingUp from '@/pages/FormSingUp'
import User from '@/pages/User'
import UserData from '@/components/UserData'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/singup',
      name: 'FormPass',
      component: FormSingUp
    },
    {
      path: '/password',
      name: 'FormSingUp',
      component: FormPass
    },
    { path: '/user',
      component: User,
      children: [
        {
          path: 'data',
          component: UserData
        }
      ]
    }
  ]
})
