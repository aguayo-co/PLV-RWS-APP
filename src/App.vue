<template lang="pug">
div.page.page_bg

  //- Header template
  PageHeader(
    @open='openLogin')

  //- Modal Login
  FormLogin(
    v-show='isLoginShow'
    @close='closeLogin')

  //- main content
  <router-view/>

  //- footer template
  PageFooter
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
