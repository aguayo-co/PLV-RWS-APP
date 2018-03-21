<template lang="pug">
div.page(
  v-bind:class='{ "is-modal": modal }'
  )

  //- Header template Mobile
  PageHeaderMobile(
    v-if="mqMobile")
  //- Header template desktop
  PageHeader(
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
    v-if='modalWindow.enabled && modalWindow.name == "FormLogin"')
  //- Modal publicar venta
  ModalExitoPublicarVenta(
    v-if='modalWindow.enabled && modalWindow.name == "ModalExitoPublicarVenta"'
    :attributes='modalWindow.parameters')
</template>

<script>

import PageHeader from '@/components/PageHeader'
import PageHeaderMobile from '@/components/PageHeaderMobile'
import FormLogin from '@/components/FormLogin'
import ModalExitoPublicarVenta from '@/components/ModalExitoPublicarVenta'
import PageFooter from '@/components/PageFooter'

export default {
  name: 'app',
  components: {
    PageHeader,
    PageHeaderMobile,
    FormLogin,
    ModalExitoPublicarVenta,
    PageFooter
  },
  data () {
    return {
    }
  },
  methods: {

  },
  computed: {
    modal () {
      return this.$store.getters['ui/modal']
    },
    modalWindow () {
      return this.$store.getters['ui/modalWindow']
    }
  },
  created: function () {
    if (localStorage.getItem('userId') !== null && localStorage.getItem('token') !== null) this.$store.dispatch('user/loadUser')
  }
}
</script>
