<template lang="pug">
//- HEADER PAGE
.page-header
  .layout-inner
    header.header__bar
      //- brand
      a.page-brand(
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
          li
            span.tool-user__item.i-bag(
              @click='togglecar')
              //-vue variable productos en el carrito
              small.badge 1
            transition(name='toggle-scale')
              .user-auth__boxes.toggle-box(
                  v-show='activeCar')
                .box-cards.toggle-box__list
                  .box-cards__head
                    p.box-cards__title 5 productos en tu carrito
                    a.box-cards__btn-x.i-x(
                      @click='togglecar') Cerrar
                  .box-cards__subhead
                    .box-cards__value
                      p.box-cards__title Total
                      span.box-cards__number $21.000
                    .btn.btn_solid Ir a Pagar
                  .box-cards__item
                    article.list__card
                      a.card__product
                        //-img producto
                        .card__figure
                          img.card__img(
                            src="/static/img/demo/product-002.jpg",
                            alt="")
                        //-info producto
                        .card__info
                          .card__header
                            h3.card__title Chaqueta de cuero mostaza
                            p.card__size Talla: XS
                          p.card__price $34.000
                    a.box-cards__btn.i-x(href='#') Cerrar
                  .box-cards__item
                    article.list__card
                      a.card__product
                        //-img producto
                        .card__figure
                          img.card__img(
                            src="/static/img/demo/product-001.jpg",
                            alt="")
                        //-info producto
                        .card__info
                          .card__header
                            h3.card__title Blusa negra style fresh
                            p.card__size Talla: XS
                          p.card__price $19.000
                    a.box-cards__btn.i-x(href='#') Cerrar
                  .box-cards__item
                    article.list__card
                      a.card__product
                        //-img producto
                        .card__figure
                          img.card__img(
                            src="/static/img/demo/product-004.jpg",
                            alt="")
                        //-info producto
                        .card__info
                          .card__header
                            h3.card__title Zapatos de línea casual
                            p.card__size Talla: 26
                          p.card__price $23.000
                    a.box-cards__btn.i-x(href='#') Cerrar
                  .box-cards__item
                    article.list__card
                      a.card__product
                        //-img producto
                        .card__figure
                          img.card__img(
                            src="/static/img/demo/product-004.jpg",
                            alt="")
                        //-info producto
                        .card__info
                          .card__header
                            h3.card__title Zapatos de línea casual
                            p.card__size Talla: 26
                          p.card__price $23.000
                    a.box-cards__btn.i-x(href='#') Cerrar
          //- Is authenticated
          li.tool-user__item.tool-user__item_auth(
            v-if='user.id')
            figure.tool-user__grid(
              @click='toggleBox()')
              small.badge.badge_user 2
              span.tool-user__avatar
                //-vue variable Notificaciones usuario
                img.tool-user__photo(
                  v-if='user.picture'
                  :src='user.picture',
                  alt='')
                span.tool-user__letter(
                  v-else
                ) {{ user.first_name.charAt(0) }}
              //-vue variable user name
              figcaption.tool-user__name {{ user.first_name }}
            transition(name='toggle-scale')
              .user-auth__menu.toggle-box(
                  v-show='active')
                ul.user-auth__list.toggle-box__list
                  li.user-auth__item
                    router-link.user-auth__link(
                      to="/user/data",
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
                      @click.prevent='logout()'
                      title="Cerrar sesión de usuario") Cerrar sesión
          //- Is NOT authenticated
          li.tool-user__item.i-user(v-else
            @click='logIn') Ingresar
</template>

<script>
// import axios from 'axios'
import PageHeaderBrand from '@/components/PageHeader-brand'
import PageHeaderMenu from '@/components/PageHeader-menu'
import PageHeaderSearch from '@/components/PageHeader-search'

import { mapState } from 'vuex'

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
      activeCar: false
    }
  },
  methods: {
    logIn: function () {
      const payload = {
        name: 'FormLogin'
      }
      this.$store.dispatch('ui/showModal', payload)
    },
    close: function () {
      this.$emit('close')
    },
    toggleBox: function () {
      this.active = !this.active
    },
    togglecar: function () {
      this.activeCar = !this.activeCar
    },
    logout: function () {
      this.$store.dispatch('user/logOut')
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
