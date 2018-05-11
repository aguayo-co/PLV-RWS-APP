<template lang="pug">
//- HEADER PAGE
.page-header
  .layout-inner
    header.header__bar
      //- brand
      router-link.page-brand(
        :to="{ name: 'home' }",
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
                      span.box-cards__number ${{ shoppingCart.total | currency }}
                    router-link.btn.btn_solid(v-if="user.id", :to="'/compra/'") Ir a Pagar
                    router-link.btn.btn_solid(v-else, :to="{ name: 'compra-guest' }") Ir a Pagar
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
                            p.card__size(v-if="product.size.name") Talla: {{ product.size.name }}
                            p.card__size(v-else) Talla: {{ product.size }}
                          p.card__price ${{ product.price | currency }}
                    button.box-cards__btn.i-x(@click="removeFromCart(product.id)") Eliminar

          //- Is authenticated
          li.tool-user__item.tool-user__item_auth(
            v-if='user.id')
            figure.tool-user__grid(
              @click='toggleBox()')
              small.badge.badge_user(v-if="user.notifications > 0") {{ user.notifications }}
              span.tool-user__avatar
                //-vue variable Notificaciones usuario
                img.tool-user__photo(
                  v-if='user.picture'
                  :src='user.picture',
                  :alt='user.first_name')
                span.tool-user__letter(
                  v-else) {{ user.first_name.charAt(0) }}
              //-vue variable user name
              figcaption.tool-user__name {{ user.first_name }}
            transition(name='toggle-scale')
              .user-auth__menu.toggle-box(
                  v-show='activeDropDowns.user')
                ul.user-auth__list.toggle-box__list
                  li.user-auth__item
                    router-link.user-auth__link(
                      :to="{ name: 'user-notificaciones'}",
                      title="Ir a tus notificaciones") Notificaciones <small class="badge" v-if="user.notifications > 0">{{ user.notifications }}</small>
                  li.user-auth__item
                    router-link.user-auth__link(
                      :to="{ name: 'user-tu-closet'}",
                      title="Ir a tu clóset") Tu Clóset
                  li.user-auth__item
                    router-link.user-auth__link(
                      :to="{ name: 'user-tus-compras'}",
                      title="Ir a tus compras") Tus Compras
                  li.user-auth__item
                    router-link.user-auth__link(
                      :to="{ name: 'user-tus-ventas'}",
                      title="Ir a tus Ventas") Tus Ventas
                  li.user-auth__item
                    a.user-auth__link(
                      @click.prevent='logout()',
                      href="#",
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
      if (this.totalProducts.length > 0) {
        this.activeDropDowns.cart ? this.$store.dispatch('ui/closeDropdown', { name: 'cart' }) : this.$store.dispatch('ui/closeAllDropdownsBut', { name: 'cart' })
      }
    },
    removeFromCart: function (productId) {
      if (this.totalProducts.length === 1) this.toggleCart()
      if (this.user.id) {
        this.$store.dispatch('cart/removeProduct', { id: productId })
      } else {
        this.$store.dispatch('guestCart/removeProduct', { id: productId })
      }
    },
    logout: function () {
      this.$store.dispatch('user/logOut')
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['cart']),
    ...mapState(['guestCart']),
    totalProducts () {
      if (this.user.id) return this.$store.getters['cart/products']
      return this.guestCart.products
    },
    activeDropDowns () {
      return this.$store.getters['ui/headerDropdownsVisible']
    },
    shoppingCart () {
      if (this.user.id) return this.cart
      return this.guestCart
    }
  }
}
</script>
