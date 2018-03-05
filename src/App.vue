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
import PageHeader from '@/components/PageHeader'
import PageHeaderMobile from '@/components/PageHeaderMobile'
import FormLogin from '@/components/FormLogin'
import PageFooter from '@/components/PageFooter'

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
