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
import PageHeader from '@/components/PageHeader'
import FormLogin from '@/components/FormLogin'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'app',
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
      this.isLoginShow = true
    },
    closeLogin: function () {
      this.isLoginShow = false
    }
  }
}

</script>
