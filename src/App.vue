<template lang="pug">
div.page

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
    footer.page-foot-mb
      nav.foot-nav-mb
        ul.foot-nav-mb__list
          li.foot-nav-mb__item(v-for='list in footer')
            a.foot-nav-mb__link(
              @click.prevent='itemActive(list)'
              :class='{active: isActive == list}',
              :href='list.url',
              :title='list.title')
              span.foot-nav-mb__name(
              :class='list.icon') {{ list.name }}
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

const UserModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    userName: localStorage.getItem('userName'),
    auth: false
  },
  mutations: {
    mutationSetUserName (state, newUserName) {
      localStorage.setItem('userName', newUserName)
      state.userName = localStorage.getItem('userName')
    },
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
    actionSetUserName ({commit, state}, newUserName) {
      commit('mutationSetUserName', newUserName)
    },
    actionSetAuth ({commit, state}) {
      commit('mutationSetAuth')
    }
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getUserName: state => {
      return state.userName
    },
    getAuth: state => {
      if (state.auth) {
        return true
      } else {
        return false
      }
    }
  }
}

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
      isActive: undefined,
      isLoginShow: false,
      footer: [
        {
          url: '/',
          icon: 'i-search',
          title: 'Buscar en el sitio',
          name: 'Buscar'
        },
        {
          url: '/',
          icon: 'i-sale',
          title: 'Ir al carrito de compras',
          name: 'Carrito'
        },
        {
          url: '/',
          icon: 'i-brand',
          title: 'Ir al home',
          name: 'Inicio'
        },
        {
          url: '/',
          icon: 'i-tag',
          title: 'Ir a vender',
          name: 'Vender'
        },
        {
          url: '/',
          icon: 'i-user',
          title: 'Ir a mi perfil',
          name: 'Mi perfil'
        }
      ]
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
    },
    itemActive: function (e) {
      this.isActive = e
    },
    NotitemActive: function (e) {
      this.isActive = undefined
    }
  }
}
</script>
