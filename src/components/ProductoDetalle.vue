<style scoped>
.swiper-container, .swiper-wrapper{
  z-index: 0;
}
</style>

<template lang="pug">
.layout-inner
  .alert-msg.alert-msg_center(v-if="isOwner")
    p Este es es un producto de tu clóset <router-link :to="{ name: 'user-tu-closet' }" class="link_underline"> Ir a mi Clóset</router-link>
  .alert-msg_spacing(v-if="isOwner")
    router-link.btn(:to="{ name: 'editar-producto', params: { productId: product.id }}") editar producto
  article.detail
    .detail__gallery
      swiper(ref="swiper", @slideChange="slideChange(this)")
        swiper-slide(
          :key='index'
          v-for='(image,index) in product.images',
          v-if="product.images")
          img.media-img(
            :src='image',
            :alt="'Foto principal ' + product.title")

      //- Thumbs
      .detail__tabs
        .detail__thumb(
          v-for='(image,index) in product.images',
          :key='index',
          :class="{'detail__thumb_active' :imgActive == index}",
          @click='slideImages(index)')
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
        .detail__discount(v-if="product.sale_price !== product.price") {{ product | discount }}% de descuento
        .detail__price_through(v-if="product.original_price") Precio original <span class="through_brand">${{ product.original_price | currency }}</span>
        .detail__price_through(v-if="product.sale_price !== product.price") Precio Prilov <span class="through_brand">${{ product.price | currency }}</span>
        p.detail__price.txt-light ${{ product.sale_price | currency }}
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
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductoDetalle',
  props: ['product'],
  data () {
    return {
      srcActive: '',
      imgActive: 0,
      loading: {
        addToCart: null,
        favorite: null
      },
      swiperOption: {

      }
    }
  },
  components: {
    swiper,
    swiperSlide
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
    },
    swiper () {
      return this.$refs.swiper.swiper
    }
  },
  methods: {
    slideChange () {
      this.imgActive = this.swiper.realIndex
    },
    slideImages (index) {
      this.imgActive = index
      this.swiper.slideTo(index)
    },
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
