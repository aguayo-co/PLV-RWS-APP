<template lang="pug">
.gridlight
  //- filter mobile
  FilterMobile(
    v-if="mqMobile",
    @setFilters="setParameters",
    @clearFilters="clearFilters",
    :filter="parameters")
  //- filter desktop
  FilterDesk(
    @setFilters="setParameters",
    :filter="parameters",
    v-if="mqDesk",
    :compact="compact")
  .section_product__scroll
    .product-grid
      //- For each producto
      article.slot.slot_grid(v-for="product in products")
        .slot__product-inner(v-if="product.image_instagram")
          router-link.slot__product(
            :class="{ 'slot__product_sold' : product.status > 30 }",
            :to="{ name: 'product', params: { slug: product.slug + '__' + product.id }}",
            :title="product.title")
            img.slot__img(
              :src="product.image_instagram",
              :alt="product.title")
            span.slot__badge(v-if="product.status > 30") Vendido
          .slot__lead
            .slot__title {{ product.title }}
            .slot__size
              .slot__size-txt {{ product.size.name }}

          //- brand/price
          .slot__info
            .slot__brand {{ product.brand.name }}
            .slot__price ${{ product.price | currency }}
    .section_product__footer
      p.btn__wrapper(
        v-if='!loading')
        span(v-if="products.length === 0") No hay productos a mostrar
        span(v-else-if="lastPage === parameters.page") Ya cargaste todos los productos
        a.btn.i-send(
          v-else-if="!mqMobile"
          @click='loadMoreProducts') Ver más prendas
      Loader(v-else)
</template>

<script>

import productAPI from '@/api/product'
import FilterDesk from '@/components/FilterDesk'
import FilterMobile from '@/components/FilterMobile'

export default {
  name: 'GridInstashop',
  props: [
    'infinite',
    'pager',
    'compact',
    'preFilter'
  ],
  components: {
    FilterDesk,
    FilterMobile
  },
  data () {
    return {
      products: [],
      lastPage: null,
      parameters: {
        'page': 1,
        'items': 12,
        'orderby': '-updated_at'
      },
      loading: true,
      enableFavorite: false
    }
  },
  watch: {
    preFilter: function () {
      this.applyPreFilter()
      this.updateProductList()
    }
  },
  methods: {
    setFavorite: function (productId) {
      let data = {
        id: this.user.id
      }
      this.user.favorites_ids.includes(productId) ? data.favorites_remove = [productId] : data.favorites_add = [productId]
      this.$store.dispatch('user/update', data)
    },
    updateProductList: function () {
      this.loading = true
      Object.keys(this.parameters).forEach(key => {
        if (!this.parameters[key]) {
          delete this.parameters[key]
        }
      })
      productAPI.get(this.parameters)
        .then((response) => {
          this.products = response.data.data
          this.lastPage = response.data.last_page
          this.loading = false
          this.$emit('doneResults', response.data.total)
        })
    },
    loadMoreProducts: async function (e) {
      if (this.lastPage > this.parameters.page) {
        this.parameters.page += 1
        this.loading = true
        await productAPI.get(this.parameters)
          .then((response) => {
            this.products.push(...response.data.data)
            this.loading = false
          })
      }
    },
    handleScroll: function (e) {
      if (this.mqMobile && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.loading) {
        if (this.lastPage > this.parameters.page) this.loadMoreProducts()
      }
    },
    setParameters: function (setFilters) {
      Object.keys(setFilters).forEach(key => {
        this.parameters[key] = setFilters[key]
      })
      this.updateProductList()
    },
    nextPage: function () {
      this.parameters.page += 1
      this.updateProductList()
    },
    prevPage: function () {
      if (this.parameters.page > 1) this.parameters.page -= 1
      this.updateProductList()
    },
    applyPreFilter: function () {
      if (this.preFilter) {
        Object.keys(this.preFilter).forEach(key => {
          this.parameters[key] = this.preFilter[key]
        })
      }
    },
    clearFilters: function () {
      this.parameters = {
        'page': 1,
        'items': 12,
        'orderby': this.parameters.orderby
      }
      this.applyPreFilter()
      this.updateProductList()
    }
  },
  created: function () {
    window.addEventListener('scroll', this.handleScroll)
    this.applyPreFilter()
    this.updateProductList()
  }
}
</script>
