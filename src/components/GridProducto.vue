<template lang="pug">
.section_filter
  //- filter mobile
  FilterMobile(
    v-if="mqMobile",
    :filter="parameters")
  //- filter desktop
  FilterDesk(
    v-if="mqDesk",
    :filter="parameters",
    :compact="compact")
  .section_product__scroll
    .product-grid
      article.slot.slot_grid(
        v-for='product in products' :key="product.id")
        button.slot__ico.i-heart(
          v-if="user.id && user.id !== product.user_id"
          @click.prevent='setFavorite(product.id)'
          :class='{ enableFavorite: user.favorites_ids.includes(product.id) }'
          title='Agrega a Favoritos') Agregar a Favoritos
        router-link.slot__product(
          :to="{ name: 'product', params: { slug: product.slug + '__' + product.id }}",
          :title='product.title')
          img.slot__img(
            :src="product.images[0]",
            :alt="'Foto de ' + product.title")
          .slot__discount(v-if="product.sale_price !== product.price") {{ product | discount }}% de descuento
          //-title/dimensions
          .slot__lead
            .slot__title {{ product.title }}
            .slot__size(
              v-if="product.size")
              .slot__size-txt {{ product.size.name }}

          //- brand/price
          .slot__info
            .slot__brand {{ product.brand.name }}
            .slot__group_price
              .slot__price_through(v-if="product.sale_price !== product.price") ${{ product.price | currency }}
              .slot__price ${{ product.sale_price | currency }}

        //- user: picture/first_name/last_name
        router-link.slot__user(
          :to="{ name: 'closet', params: { userId: product.user.id }}",
          :title='product.user.first_name')
          .slot__user-img
            .slot__avatar
              img.slot__picture(
                v-if='product.user.picture'
                :src='product.user.picture',
                :alt='product.user.first_name')
              span.tool-user__letter(
                v-else) {{ product.user.first_name.charAt(0) }}
          .slot__user-info
            .slot__prilover {{ product.user | full_name }}
            .group(v-if='product.user.groups.length > 0')
              .slot__group.i-it-girl(
                v-if='product.user.groups[0].slug === "it-girl"') It <span class="txt_brand">girl</span>
              .slot__group.i-star-on(
                v-if='product.user.groups[0].slug === "prilover-star"') Prilover <span class="txt_brand">Star</span>
  .section_product__footer
    Pager(
      v-model='products'
      v-on:paging="loading = $event"
      :forcedParams='preFilter'
      :basePath="basePath"
      :infinite="infinite")
</template>

<script>
import { mapState } from 'vuex'
import productAPI from '@/api/product'
import FilterDesk from '@/components/FilterDesk'
import FilterMobile from '@/components/FilterMobile'
import Pager from '@/components/Pager'

export default {
  name: 'GridProducto',
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
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      basePath: productAPI.basePath,
      products: [],
      parameters: {
        'orderby': '-id'
      },
      loading: true,
      enableFavorite: false
    }
  },
  methods: {
    setFavorite (productId) {
      let data = {
        id: this.user.id
      }
      this.user.favorites_ids.includes(productId) ? data.favorites_remove = [productId] : data.favorites_add = [productId]
      this.$store.dispatch('user/update', data)
    }
  }
}
</script>
