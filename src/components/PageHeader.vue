<template lang="pug">
//- HEADER PAGE
.page-header(v-bind:style="fixedPosition")
  .layout-inner
    header.header__bar(
      :class="{ 'header__bar_fix':fixHeader }"
    )
      //- brand
      h1.page-brand(
        v-if='page')
        PageHeaderBrand
      a.page-brand(
        v-else='',
        href='/',
        title='Ir a la página de inicio')
        PageHeaderBrand
      //- Menu
      PageHeaderMenu
      //- search
      PageHeaderSearch
      //- user
      nav.tool-user
        ul.tool-user__grid
          li.tool-user__item.i-bag
            //-vue variable productos en el carrito
            small.badge 1
          //- Is authenticated
          li.tool-user__item.tool-user__item_auth(v-if= 'getAuth')
            figure.tool-user__grid(
              @click='toggleBox()')
              small.badge.badge_user 2
              span.tool-user__avatar
                //-vue variable Notificaciones usuario
                img.tool-user__photo(
                  src='/static/img/demo/user-avatar.jpg',
                  alt='')
              //-vue variable user name
              figcaption.tool-user__name {{getName}}
            transition(name='toggle-scale')
              .user-auth__menu.toggle-box(
                  v-show='active')
                ul.user-auth__list.toggle-box__list
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a tu cuenta") Tu cuenta
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a tus compras") Tus compras
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a tus Ventas") Tus Ventas
                  li.user-auth__item
                    a.user-auth__link(
                      href="",
                      title="Ir a Centro de mensajes") Centro de mensajes
                  li.user-auth__item
                    a.user-auth__link(
                      @click='logout()'
                      href="/home",
                      title="Cerrar sesión de usuario") Cerrar sesión
          //- Is NOT authenticated
          li.tool-user__item.i-user(v-else
            @click='open') Ingresar
</template>

<script>
import PageHeaderBrand from '@/components/PageHeader-brand'
import PageHeaderMenu from '@/components/PageHeader-menu'
import PageHeaderSearch from '@/components/PageHeader-search'

export default {
  name: 'PageHeader',
  components: {
    PageHeaderBrand,
    PageHeaderMenu,
    PageHeaderSearch
  },
  data () {
    return {
      active: false,
      fixedPosition: {
        position: 'fixed',
        top: 0
      }
    }
  },
  methods: {
    open: function () {
      this.$emit('open')
    },
    close: function () {
      this.$emit('close')
    },
    toggleBox: function () {
      this.active = !this.active
    },
    logout: function () {
      this.$store.dispatch('UserModule/actionSetToken', null)
      localStorage.setItem('token', null)
      this.$store.dispatch('UserModule/actionSetUserName', '')
    }
  },
  computed: {
    getName () {
      return this.$store.getters['UserModule/getUserName']
    },
    getAuth () {
      if (this.$store.getters['UserModule/getAuth'] != null && this.getName !== '') {
        return true
      } else {
        return false
      }
    }
  },
  props: ['brandHome']
}
</script>
