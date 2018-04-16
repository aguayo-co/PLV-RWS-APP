<template lang="pug">
//- Footer PAGE FOOTER MOBILE
footer.page-foot(:class="{openSearchMb : active}")
  nav.foot-nav_mb
    ul.foot-nav__list
      li.foot-nav__item
        a.foot-nav__link(@click='animSearch')
          span.foot-nav__name.i-search Buscar
        transition(name='slide-right')
          //- Sugerencias de búsqueda a nivel de:
              marcas, categorías, nombres de Prilovers.
          .foot-nav__fixed(v-show='active')
            a.foot-nav__close.i-x(href="#", @click='animSearch')
            h4.foot-nav__title Buscar
            form.foot-nav__search(action='', method='GET')
              .foot-nav__search-row.i-search
                input.foot-nav__search-input.form__control#searchMain(type='text', name='search')
                button.btn.btn_solid.foot-nav__search-btn Buscar
            ul.foot-nav__sublist
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Vestidos
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Verano forever
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") ZARA
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Ofertas
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Joyitas premium
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Vestidos
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Verano forever
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") ZARA
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Ofertas
              li.foot-nav__subitem
                a.foot-nav__sublink(href="#") Joyitas premium
      li.foot-nav__item
        a.foot-nav__link
          span.foot-nav__name.i-sale Carrito
      li.foot-nav__item
        a.foot-nav__link
          span.foot-nav__name.i-brand Ir al home
      li.foot-nav__item
        a.foot-nav__link
          span.foot-nav__name.i-tag Vender
      //- li.foot-nav-mb__item(v-for='list in footer')
      //-   a.foot-nav-mb__link(
      //-     @click.prevent='itemActive(list)'
      //-     :class='{active: isActive == list}',
      //-     :href='list.url',
      //-     :title='list.title')
      //-     span.foot-nav-mb__name(
      //-     :class='list.icon') {{ list.name }}
      //- Is authenticated
      li.foot-nav__item.tool-user__item_auth(
        v-if= 'getAuth')
        figure.tool-user__grid
          small.badge.badge_user 2
          span.tool-user__avatar
            //-vue variable Notificaciones usuario
            img.tool-user__photo(
              src='/static/img/demo/user-avatar.jpg',
              alt='')
          //-vue variable user name
          figcaption.tool-user__name {{ getName }}
      //- Is NOT authenticated
      li.foot-nav-mb__item(
        v-else)
        //- a.foot-nav-mb__link(
        //-   :href='itemAuth.url',
        //-   :title='itemAuth.title')
        //-   span.foot-nav-mb__name(
        //-   :class='itemAuth.icon') {{ itemAuth.name }}
        a.foot-nav__link(
          href='/',
          title='Ir a registrarse')
          span.foot-nav__name.i-user Mi perfil
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
      localStorage.removeItem('token')
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
