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
              @click='toggleCart')
              //-vue variable productos en el carrito
              small.badge(v-if="totalProducts.length > 0") {{ totalProducts.length }}
            transition(name='toggle-scale')
              .user-auth__boxes.toggle-box(
                  v-show='activeDropDowns.cart')
                .box-cards.toggle-box__list
                  .box-cards__head
                    p.box-cards__title(v-if="totalProducts.length > 1") {{ totalProducts.length }} productos en tu carrito
                    p.box-cards__title(v-else) {{ totalProducts.length }} producto en tu carrito
                    a.box-cards__btn-x.i-x(
                      @click='toggleCart') Cerrar
                  .box-cards__subhead
                    .box-cards__value
                      p.box-cards__title Total
                      span.box-cards__number ${{ cart.total | currency }}
                    router-link.btn.btn_solid(:to="'/compra/'") Ir a Pagar
                  .box-cards__item(v-for="product in totalProducts")
                    article.list__card
                      a.card__product
                        //-img producto
                        .card__figure
                          img.card__img(
                            :src="product.images[0]",
                            :alt="product.title")
                        //-info producto
                        .card__info
                          .card__header
                            h3.card__title {{ product.title }}
                            p.card__size Talla: {{ product.size }}
                          p.card__price ${{ product.price | currency }}
                    button.box-cards__btn.i-x(@click="removeFromCart(product.id)") Eliminar

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
                  v-show='activeDropDowns.user')
                ul.user-auth__list.toggle-box__list
                  li.user-auth__item
                    router-link.user-auth__link(
                      to="/user/data",
                      title="Ir a tu cuenta") Tu cuenta
                  li.user-auth__item
                    router-link.user-auth__link(
                      :to="'/user/tus-compras'",
                      title="Ir a tus compras") Tus compras
                  li.user-auth__item
                    router-link.user-auth__link(
                      :to="'/user/tus-ventas'",
                      title="Ir a tus Ventas") Tus Ventas
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
    return { }
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
      this.activeDropDowns.user ? this.$store.dispatch('ui/closeDropdown', { name: 'user' }) : this.$store.dispatch('ui/closeAllDropdownsBut', { name: 'user' })
    },
    toggleCart: function () {
      this.activeDropDowns.cart ? this.$store.dispatch('ui/closeDropdown', { name: 'cart' }) : this.$store.dispatch('ui/closeAllDropdownsBut', { name: 'cart' })
    },
    removeFromCart: function (productId) {
      this.$store.dispatch('cart/removeProduct', { id: productId })
    },
    logout: function () {
      this.$store.dispatch('user/logOut')
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['cart']),
    totalProducts () {
      return this.$store.getters['cart/products']
    },
    activeDropDowns () {
      return this.$store.getters['ui/headerDropdownsVisible']
    }
  }
}
</script>
