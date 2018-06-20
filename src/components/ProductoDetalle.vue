<template lang="pug">
.layout-inner
  .alert-msg.alert-msg_center(v-if="isOwner")
    p Este es es un producto de tu clóset <router-link :to="{ name: 'closet', params: { userId: user.id }}" class="link_underline"> Ir a mi Clóset</router-link>
  .alert-msg_spacing(v-if="isOwner")
    router-link.btn(:to="{ name: 'editar-producto', params: { productId: product.id }}") editar producto
  article.detail
    .detail__gallery
      figure.detail__picture
        img.media-img(
          v-if="srcActive === '' && product.images"
          :src='product.images[0]',
          :alt="'Foto principal ' + product.title")
        img.media-img(
          v-else='',
          :src='srcActive',
          :alt="'Foto ' + product.title")
      //- Thumbs
      .detail__tabs(
        :class="{'detail__tabs_initial' :srcActive == ''}")
        .detail__thumb(
          v-for='(image,index) in product.images',
          :key='index',
          :class="{'detail__thumb_active' :srcActive == image}",
          @click='SrcActive(image)')
          img.media-img.detail__img(
            :src='image',
            :alt="'Detalle ' + product.title + ' foto ' + (index  + 1)")
    .detail__content(v-if="product.user")
      header.detail__header
        h1.detail__title {{ product.title }}
      p.detail__brand(v-if="product.brand") {{ product.brand.name }}
      p.detail__size
        span(v-if="product.size") Talla: {{ product.size.name }} |
        span(v-if="product.colors") &nbsp; Colores: {{ product.colors[0].name }} |
        span(v-if="product.condition") &nbsp; {{ product.condition.name }}
      .detail__value
        p.detail__through.through(v-if="product.original_price") ${{ product.original_price | currency }}
        p.detail__price.txt-light ${{ product.price | currency }}
      .detail__actions(v-if="!isOwner")
        button.detail__btn.btn.btn_solid(
          @click.prevent=""
          v-if="loading.addToCart")
          Dots
        button.detail__btn.btn.btn_solid(
          v-else-if="!inCart && product.status >= 10 && product.status < 20"
          @click="addToCart") Comprar
        button.detail__btn.btn.btn_disabled(v-else-if="inCart") En carrito
        button.detail__btn.btn.btn_disabled(v-else-if="product.status < 10 || (product.status >= 20 && product.status <= 30)") No disponible
        button.detail__btn.btn.btn_disabled(v-else="product.status > 30") Vendido
        button.detail__btn.btn.i-heart(
          @click.prevent=""
          v-if="loading.favorite")
          Dots
        button.detail__btn.btn.i-heart(
          v-else-if="user.id"
          @click.prevent='setFavorite(product.id)'
          :class='{ active: user.favorites_ids.includes(product.id) }'
          :title="'Agrega ' + product.title + ' a Favoritos'") {{ user.favorites_ids.includes(product.id) ? "En tus favoritos" : "Agregar favoritos" }}
      .detail__lead
        h2.detail__subtitle Descripción
        p.detail__txt {{ product.description }}
        h2.detail__subtitle Despacho
        p.detail__txt.detail__txt_ico.i-ok( v-for="method in product.user.shipping_methods")
          | {{ method.name }} <small class="detail__txt_small">{{ method.description_buyer }}</small>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductoDetalle',
  props: ['product'],
  data () {
    return {
      srcActive: '',
      loading: {
        addToCart: null,
        favorite: null
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapState(['user']),
    ...mapState(['guestCart']),
    totalProducts () {
      if (this.user.id) return this.$store.getters['cart/products']
      return this.guestCart.products
    },
    inCart () {
      if (this.totalProducts.length > 0) {
        if (this.totalProducts.filter(x => x.id === this.product.id).length > 0) return true
      }
      return false
    },
    isOwner () {
      if (this.user.id) return this.user.id === this.product.user_id
      return false
    }
  },
  methods: {
    SrcActive: function (e) {
      this.srcActive = e
    },
    addToCart: function () {
      this.loading.addToCart = true

      if (this.user.id) {
        this.$store.dispatch('cart/addProduct', { id: this.product.id })
          .finally(() => {
            this.loading.addToCart = false
          })
        return
      }

      this.$store.dispatch('guestCart/addProduct', { ...this.product })
        .finally(() => {
          this.loading.addToCart = false
        })
    },
    setFavorite: function (productId) {
      this.loading.favorite = true
      let data = {
        id: this.user.id
      }
      this.user.favorites_ids.includes(productId) ? data.favorites_remove = [productId] : data.favorites_add = [productId]
      this.$store.dispatch('user/update', data).then(() => {
        this.loading.favorite = false
      })
    }
  }
}
</script>
