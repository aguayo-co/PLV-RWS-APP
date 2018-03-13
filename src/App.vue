<template lang="pug">
div.page(
  v-bind:class='{ "is-modal": modal }'
  )

  //- Header template Mobile
  PageHeaderMobile(
    v-if="mqMobile")
  //- Header template desktop
  PageHeader(
    @open='openLogin',
    v-if="mqDesk")

  //- main content
  main.content-main

    //- Router Page
    router-view

  //- footer template Mobile
  .footerMobile(
    v-if="mqMobile")
  //- footer template desktop
  PageFooter(
    v-if="mqDesk")

  //- Modal Login
  FormLogin(
    v-show='isLoginShow'
    @close='closeLogin')
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import PageHeader from '@/components/PageHeader'
import PageHeaderMobile from '@/components/PageHeaderMobile'
import FormLogin from '@/components/FormLogin'
import PageFooter from '@/components/PageFooter'

Vue.use(Vuex)

// eslint-disable-next-line

/*

const PasswordModule = {
  namespaced: true,
  state: {
    changePassToken: '',
    userEmail: localStorage.getItem('userEmail'),
    passState: 'requestForm'
  },
  mutations: {
    mutationSetChangePassToken (state, newPassToken) {
      state.changePassToken = newPassToken
    },
    mutationsSetPassState (state, newState) {
      state.passState = newState
    },
    mutationsSetUserEmail (state, newEmail) {
      state.userEmail = newEmail
    }
  },
  getters: {
    getPassToken: state => {
      return state.changePassToken
    },
    getPassState: state => {
      return state.passState
    },
    getUserEmail: state => {
      return state.userEmail
    }
  },
  actions: {
    actionSetChangePassToken ({commit, state}, newPassToken) {
      commit('mutationSetChangePassToken', newPassToken)
    },
    actionSetPassState ({commit, state}, newState) {
      commit('mutationsSetPassState', newState)
    },
    actionSetUserEmail ({commit, state}, newEmail) {
      commit('mutationsSetUserEmail', newEmail)
    }
  }
}
const store = new Vuex.Store({
  modules: {
    UserModule: UserModule,
    PasswordModule: PasswordModule
  }
})
*/

export default {
  name: 'app',
  components: {
    PageHeader,
    PageHeaderMobile,
    FormLogin,
    PageFooter
  },
  data () {
    return {
      isLoginShow: false
    }
  },
  methods: {
    // Login modal
    openLogin: function () {
      // this.$store.set('userAuth', {token: 'puto token'})
      // console.log(this.$store.get('userAuth'))
      this.isLoginShow = true
    },
    closeLogin: function () {
      this.isLoginShow = false
    }
  },
  computed: {
    modal () {
      return this.$store.getters['ui/modal']
    }
  },
  created: function () {
    if (localStorage.getItem('userId') !== null && localStorage.getItem('token') !== null) this.$store.dispatch('user/loadUser')
  }
}
</script>
