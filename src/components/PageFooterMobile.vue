<template lang="pug">
//- Footer PAGE FOOTER MOBILE
footer.page-foot-mb
  nav.foot-nav-mb
    ul.foot-nav-mb__list
      li.foot-nav-mb__item
        a.foot-nav-mb__link(@click='animSearch()')
          span.foot-nav-mb__name.i-search Buscar
        transition(name='slide-left')
          //- Sugerencias de búsqueda a nivel de:
              marcas, categorías, nombres de Prilovers.
          .anim-search(v-show='active')
            form.search(action='', method='GET')
              .search__row
                input.search__input#searchMain(type='text', name='search', placeholder='¿Qué buscas?')
                input.search__btn(type='submit', value='')
      li.foot-nav-mb__item
        a.foot-nav-mb__link
          span.foot-nav-mb__name.i-sale Carrito
      li.foot-nav-mb__item
        a.foot-nav-mb__link
          span.foot-nav-mb__name.i-brand Ir al home
      li.foot-nav-mb__item
        a.foot-nav-mb__link
          span.foot-nav-mb__name.i-tag Vender
      //- li.foot-nav-mb__item(v-for='list in footer')
      //-   a.foot-nav-mb__link(
      //-     @click.prevent='itemActive(list)'
      //-     :class='{active: isActive == list}',
      //-     :href='list.url',
      //-     :title='list.title')
      //-     span.foot-nav-mb__name(
      //-     :class='list.icon') {{ list.name }}
      //- Is authenticated
      li.foot-nav-mb__item.tool-user__item_auth(
        v-if= 'getAuth')
        figure.tool-user__grid(
        @click='toggleBox()')
          small.badge.badge_user 2
          span.tool-user__avatar
            //-vue variable Notificaciones usuario
            img.tool-user__photo(
              src='/static/img/demo/user-avatar.jpg',
              alt='')
          //-vue variable user name
          figcaption.tool-user__name {{ getName }}
        transition(name='toggle-footermb')
          .user-auth__menu.toggle-box_footer(
              v-show='active')
            ul.user-auth__list.toggle-box_footer__list
              li.user-auth__item
                router-link.user-auth__link(
                  to="/user",
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
      li.foot-nav-mb__item(
        v-else)
        //- a.foot-nav-mb__link(
        //-   :href='itemAuth.url',
        //-   :title='itemAuth.title')
        //-   span.foot-nav-mb__name(
        //-   :class='itemAuth.icon') {{ itemAuth.name }}
        a.foot-nav-mb__link(
          href='/',
          title='Ir a registrarse')
          span.foot-nav-mb__name.i-user Mi perfil
</template>

<script>
export default {
  name: 'PageFooterMobile',
  data () {
    return {
      isActive: undefined,
      active: false,
      ProfActive: false,
      // Data del menú mobile-footer
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
        }
      ],
      // Data del Item Auth menú mobile footer
      itemAuth: [
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
    itemActive: function (e) {
      this.isActive = e
    },
    NotitemActive: function (e) {
      this.isActive = undefined
    },
    open: function () {
      this.$emit('open')
    },
    close: function () {
      this.$emit('close')
    },
    toggleBox: function () {
      this.active = !this.active
    },
    animSearch: function () {
      this.active = !this.active
    },
    logout: function () {
      this.$store.dispatch('UserModule/actionSetToken', null)
      this.$store.dispatch('UserModule/actionSetAuth')
      localStorage.setItem('token', null)
      this.$store.dispatch('UserModule/actionSetUserName', '')
    }
  },
  computed: {
    getName () {
      return this.$store.getters['UserModule/getUserName']
    },
    getAuth () {
      if (this.$store.getters['UserModule/getAuth'] !== null && this.getName !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
