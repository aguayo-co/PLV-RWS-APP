<template lang="pug">
div.page

  //- Header template
  mq-layout(mq='mobile')
    PageHeaderMobile
  mq-layout(mq='desktop')
    //- Header template desktop
    PageHeader(
      @open='openLogin')

  //- main content
  main.content-main

    //- Router Page
    router-view

  //- footer template
  mq-layout(mq='mobile')
    h1 estoy en mobile
  mq-layout(mq='desktop')
    //- footer template desktop
    PageFooter

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

const signUpModule = {
  namespaced: true,
  state: {
    nombre: ''
  },
  mutations: {
    mutationSetName (state, newName) {
      state.nombre = newName
    }
  },
  actions: {
    actionSetName ({commit, state}, newName) {
      commit('mutationSetName', newName)
    }
  },
  getters: {
    getName: state => {
      return state.nombre
    }
  }
}

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    auth: false
  },
  mutations: {
    mutationSetToken (state, newToken) {
      localStorage.setItem('token', newToken)
      state.token = localStorage.getItem('token')
    },
    mutationSetAuth (state) {
      if (!state.auth) {
        state.auth = true
      } else {
        state.auth = false
      }
    }
  },
  actions: {
    actionSetToken ({commit, state}, newToken) {
      commit('mutationSetToken', newToken)
    },
    actionSetAuth ({commit, state}) {
      commit('mutationSetAuth')
    }
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getAuth: state => {
      if (state.auth) {
        return true
      } else {
        return false
      }
    }
  },
  modules: {
    signUp: signUpModule
  }
})

export default {
  name: 'app',
  store: store,
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
  }
}

</script>
