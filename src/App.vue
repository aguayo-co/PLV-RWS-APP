<template lang="pug">
div.page(
  v-bind:class='{ "is-modal": modal, "page-user" : user.id }'
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
    p.preload(v-if="loading")
      span.preload__spin.preload__spin_1
      span.preload__spin.preload__spin_2
      span.preload__spin.preload__spin_3
      span.preload__spin.preload__spin_4

    router-view(v-else)

  //- footer template Mobile
  PageFooterMobile(
    v-if="mqMobile")
  //- footer template desktop
  PageFooter(
    v-if="mqDesk")

  //- Modal Login
  FormLogin(
    v-if='modalWindow.enabled && modalWindow.name == "FormLogin"')
  //- Modal publicar venta
  ModalExitoPublicarVenta(
    v-if='modalWindow.enabled && modalWindow.name == "ModalExitoPublicarVenta"',
    :attributes='modalWindow.parameters')
  ModalMessage(
    v-if='modalWindow.enabled && modalWindow.name == "ModalMessage"',
    :attributes='modalWindow.parameters')
  ModalPasswordChange(
    v-if='modalWindow.enabled && modalWindow.name == "ModalPasswordChange"')
</template>

<script>

import PageHeader from '@/components/PageHeader'
import PageHeaderMobile from '@/components/PageHeaderMobile'
import FormLogin from '@/components/FormLogin'
import ModalExitoPublicarVenta from '@/components/ModalExitoPublicarVenta'
import ModalMessage from '@/components/ModalMessage'
import ModalPasswordChange from '@/components/ModalPasswordChange'
import PageFooter from '@/components/PageFooter'
import PageFooterMobile from '@/components/PageFooterMobile'

import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    ModalPasswordChange,
    PageHeader,
    PageHeaderMobile,
    FormLogin,
    ModalExitoPublicarVenta,
    ModalMessage,
    PageFooter,
    PageFooterMobile
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    routeGuard: function () {
      let route = this.$route
      if (route.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (window.localStorage.getItem('userId')) {
        } else {
          this.$router.replace({
            path: '/acceso-denegado'
          })
        }
      }
    }
  },
  computed: {
    ...mapState(['user']),
    modal () {
      return this.$store.getters['ui/modal']
    },
    modalWindow () {
      return this.$store.getters['ui/modalWindow']
    }
  },
  created: function () {
    this.routeGuard()
    this.$moment.locale('es')
    this.$store.dispatch('ui/loadProperties')
    this.$store.dispatch('user/loadUser')
      .then(response => {
        if (response) {
          this.$store.dispatch('cart/load')
        } else {
          this.$store.dispatch('guestCart/load')
        }
        this.loading = false
      })
  }
}
</script>
