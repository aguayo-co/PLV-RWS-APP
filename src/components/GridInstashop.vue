<template lang="pug">
.gridlight
  //- filter mobile
  FilterMobile(
    :extraOrderOptions='extraOrderOptions'
    v-if="mqMobile",
    :filter="parameters")
  //- filter desktop
  FilterDesk(
    :extraOrderOptions='extraOrderOptions'
    v-if="mqDesk",
    :filter="parameters",
    :compact="compact")
  .section_product__scroll
    .product-grid
      //- For each producto
      article.slot.slot_grid(v-for="product in products" :key="product.id")
        .slot__product-inner
          router-link.slot__product(
            :class="{ 'slot__product_sold' : product.status > 30 }",
            :to="{ name: 'product', params: { slug: product.slug + '__' + product.id }}",
            :title="product.title")
            img.slot__img(
              :src="product.image_instagram || product.images[0]",
              :alt="product.title")
            span.slot__badge(v-if="product.status > 30") Vendido
            .slot__discount(v-if="product.sale_price !== product.price") {{ product | discount }}% de descuento
          .slot__lead
            .slot__title {{ product.title }}
            .slot__size
              .slot__size-txt {{ product.size.name }}

          //- brand/price
          .slot__info
            .slot__brand {{ product.brand.name }}
            .slot__regular-price(v-if="product.sale_price !== product.price") ${{ product.price | currency }}
            .slot__price ${{ product.sale_price | currency }}
  .section_product__footer
    Pager(
      v-model='products'
      v-on:paging="loading = $event"
      :forcedParams='preFilter'
      :basePath="basePath"
      :infinite="infinite")
</template>

<script>
import productAPI from '@/api/product'
import FilterDesk from '@/components/FilterDesk'
import FilterMobile from '@/components/FilterMobile'
import Pager from '@/components/Pager'

export default {
  name: 'GridInstashop',
  props: [
    'infinite',
    'pager',
    'compact',
    'preFilter'
  ],
  components: {
    Pager,
    FilterDesk,
    FilterMobile
  },
  data () {
    return {
      extraOrderOptions: [{ name: 'Instashop', param: '-image_instagram_date' }],
      basePath: productAPI.basePath,
      products: [],
      parameters: {
        'orderby': '-image_instagram_date'
      },
      loading: true,
      enableFavorite: false
    }
  },
  methods: {
    setFavorite: function (productId) {
      let data = {
        id: this.user.id
      }
      this.user.favorites_ids.includes(productId) ? data.favorites_remove = [productId] : data.favorites_add = [productId]
      this.$store.dispatch('user/update', data)
    }
  }
}
</script>
