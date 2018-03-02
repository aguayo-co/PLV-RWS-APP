<template lang="pug">
div.page
  //- Header template
  PageHeader(
    @open='openLogin')

  //- main content
  main.content-main

    //- Router Page
    router-view

  //- footer template
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
import FormLogin from '@/components/FormLogin'
import PageFooter from '@/components/PageFooter'
Vue.use(Vuex)

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
  modules: {
    signUp: signUpModule
  }

})

export default {
  name: 'app',
  store: store,
  components: {
    PageHeader,
    FormLogin,
    PageFooter
  },
  data () {
    return {
      isLoginShow: false
    }
  },
  methods: {
    // submenu auth
    toggleBox: function () {
      this.active = !this.active
    },
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
