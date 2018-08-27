<template lang="pug">
//- Footer PAGE FOOTER MOBILE
footer.page-foot(:class="{openSearchMb : active || activeCart}")
  nav.foot-nav_mb
    ul.foot-nav__list
      li.foot-nav__item
        a.foot-nav__link(@click='animSearch')
          span.foot-nav__name.i-search Buscar
        transition(name='slide-right')
          //- Sugerencias de búsqueda a nivel de:
              marcas, categorías, nombres de Prilovers.
          .foot-nav__fixed(v-show='active')
            a.foot-nav__close.i-x(@click='animSearch')
            h4.foot-nav__title Buscar
            form.foot-nav__search(@submit.prevent="search")
              .foot-nav__search-row.i-search
                input.foot-nav__search-input.form__control#searchMain(type='text', name='search', v-model="query")
                input.btn.btn_solid.foot-nav__search-btn(type="submit", value="Buscar")
            ul.foot-nav__sublist
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'productos-filtrado', params: { type: 'categorias', slug: 'botas' }}") Botas
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'productos-filtrado', params: { type: 'categorias', slug: 'chaquetas' }}") Chaquetas
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'productos-filtrado', params: { type: 'marcas', slug: 'zara' }}") Zara
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'productos-filtrado', params: { type: 'marcas', slug: 'rapsodia' }}") Rapsodia
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'productos-filtrado', params: { type: 'marcas', slug: 'topshop' }}") Topshop
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'Instashop' }") Instashop
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(to="/shop") Recién llegados
              li.foot-nav__subitem(@click='animSearch')
                router-link.foot-nav__sublink(:to="{ name: 'closet-room' }") Clóset room
      li.foot-nav__item
        a.foot-nav__link(
          @click='animCart')
          span.foot-nav__name.i-bag Carrito
          small.badge.badge_user(v-if="totalProducts && totalProducts.length > 0") {{ totalProducts.length }}
          //-Carrito de compras
        transition(name='slide-right')
          .foot-nav__fixed(v-show='activeCart')
            a.foot-nav__close.i-x(@click='animCart')
            h4.foot-nav__title Carrito
            .box-cards
              .box-cards__head
                p.box-cards__title(v-if="totalProducts.length == 1") 1 producto en tu carrito
                p.box-cards__title(v-else) {{ totalProducts.length }} productos en tu carrito
              .box-cards__subhead(v-if="totalProducts.length")
                .box-cards__value
                  p.box-cards__title Total
                  span.box-cards__number ${{ shoppingCart.total | currency }}
                a.btn.btn_solid.btn_small(
                  @click.prevent="goToPayment") Ir a Pagar
              .box-cards__item(v-for="product in totalProducts" :key="product.id")
                article.list__card
                  a.card__product
                    //-img producto
                    .card__figure
                      img.card__img(
                        :src="product.images[0]",
                        :alt="'Foto de ' + product.title")
                    //-info producto
                    .card__info
                      .card__header
                        h3.card__title {{ product.title }}
                        p.card__size(v-if="product.size.name") Talla: {{ product.size.name }}
                        p.card__size(v-else) Talla: {{ product.size }}
                      p.card__price ${{ product.sale_price | currency }}
                Dots.dark(v-if="deleting[product.id]")
                button.box-cards__btn.i-x(v-else @click="removeFromCart(product)") Eliminar
      li.foot-nav__item.foot-nav__item_brand
        router-link.foot-nav__link(:to="{ name: 'home' }")
          span.foot-nav__name.i-brand Ir al home
      li.foot-nav__item
        router-link.foot-nav__link(:to="'/publicar-venta/'")
          span.foot-nav__name.i-tag Vender
      //- Is authenticated
      li.foot-nav__item.tool-user__item_auth(
        v-if='user.id')
        router-link.foot-nav__link(:to="{ name: 'user-data' }")
          figure.tool-user__grid
            small.badge.badge_user(v-if="user.unread_count > 0") {{ user.unread_count }}
            span.tool-user__avatar
              //-vue variable Notificaciones usuario
              img.tool-user__photo(
                  v-if='user.picture',
                  :src='user.picture',
                  :alt='user.first_name')
              span.tool-user__letter(
                v-else) {{ user.first_name.charAt(0) }}
            //-vue variable user name
            figcaption.tool-user__name {{ user.first_name }}
      //- Is NOT authenticated
      li.foot-nav-mb__item(
        v-else)
        a.foot-nav__link(@click='logIn')
          span.foot-nav__name.i-user Ingresar

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'PageFooterMobile',
  data () {
    return {
      deleting: {},
      isActive: undefined,
      active: false,
      ProfActive: false,
      activeCart: false,
      query: null
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
    animSearch: function () {
      this.active = !this.active
    },
    animCart: function () {
      this.activeCart = !this.activeCart
    },
    removeFromCart: function (product) {
      this.$set(this.deleting, product.id, true)

      if (this.user.id) {
        this.$store.dispatch('cart/removeProduct', { id: product.id })
          .finally(() => {
            this.$delete(this.deleting, product.id)
          })
        return
      }

      this.$store.dispatch('guestCart/removeProduct', { id: product.id })
        .finally(() => {
          this.$delete(this.deleting, product.id)
        })
    },
    logIn: function () {
      const payload = {
        name: 'FormLogin'
      }
      this.$store.dispatch('ui/showModal', payload)
    },
    goToPayment: function () {
      this.animCart()
      if (this.user.id) {
        this.$router.push({name: 'compra'})
        return
      }
      this.$router.push({name: 'compra-guest'})
    },
    search: function () {
      this.$router.push({ name: 'search', params: { query: this.query } })
      this.animSearch()
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapState(['cart']),
    ...mapState(['guestCart']),
    shoppingCart () {
      if (this.user.id) return this.cart
      return this.guestCart
    },
    totalProducts () {
      if (this.user.id) return this.$store.getters['cart/products']
      return this.guestCart.products
    }
  }
}
</script>
