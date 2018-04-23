<template lang="pug">
.layout-inner
  p(v-if="isOwner") Este es es un producto de tu closet
    router-link(:to="'/closet/' + user.id") Ir a mi Closet
  article.detail
    .detail__gallery
      figure.detail__picture
        img.media-img(
          v-if="srcActive === ''"
          :src='product.images[0]',
          alt='')
        img.media-img(
          v-else='',
          :src='srcActive',
          alt='')
      //- Thumbs
      .detail__tabs(
        :class="{'detail__tabs_initial' :srcActive == ''}")
        .detail__thumb.i-heart-on(
          v-for='(image,index) in product.images',
          :key='index',
          :class="{'detail__thumb_active' :srcActive == image}",
          @click='SrcActive(image)')
          img.media-img.detail__img(
            :src='image',
            alt='')
    .detail__content
      header.detail__header
        h1.detail__title {{ product.title }}
      p.detail__tag.tag Producto {{ product.condition.name }}
      p.detail__brand {{ product.brand.name }}
      p.detail__size
        span(v-if="product.size") Talla: {{ product.size.name }} |
        span(v-if="product.colors[0]") &nbsp; Colores: {{ product.colors[0].name }}
      .detail__value
        p.detail__through.through ${{ product.original_price | currency }}
        p.detail__price.txt-light ${{ product.price | currency }}
      .detail__actions(v-if="!isOwner")
        button.detail__btn.btn.btn_solid(
          v-if="!inCart"
          @click="addToCart") Comprar
        button.detail__btn.btn.btn_disabled(v-else) En carrito
        a.detail__btn.btn.i-heart(
          href="#") Agregar a Favoritos
      .detail__lead
        h2.detail__subtitle Descripción
        p.detail__txt {{ product.description }}
        h2.detail__subtitle Despacho
        p.detail__txt.detail__txt_ico.i-ok(v-for="method in product.user.shipping_methods")
          | {{ method.name }} <small class="detail__txt_small">{{ method.description_buyer }}</small>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductoDetalle',
  props: ['product'],
  data () {
    return {
      srcActive: ''
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapState(['user']),
    totalProducts () {
      return this.$store.getters['cart/products']
    },
    inCart () {
      if (this.totalProducts.length > 0) {
        if (this.totalProducts.filter(x => x.id === this.product.id)) return true
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
      this.$store.dispatch('cart/addProduct', { id: this.product.id })
    }
  }
}
</script>
