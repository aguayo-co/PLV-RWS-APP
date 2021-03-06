<template lang="pug">
.section_filter
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
      article.slot.slot_grid(
        v-for='product in products')
        button.slot__ico.i-heart(
          v-if="user.id && user.id !== product.user_id"
          @click.prevent='setFavorite(product.id)'
          :class='{ enableFavorite: user.favorites_ids.includes(product.id) }'
          title='Agrega a Favoritos') Agregar a Favoritos
        router-link.slot__product(
          :to="{ name: 'product', params: { slug: product.title + '__' + product.id }}",
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
                v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
              .slot__group.i-star-on(
                v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
    .section_product__footer(v-if="infinite")
      p.btn__wrapper(
        v-if='!loading')
        span(v-if="products.length === 0") No hay productos a mostrar
        span(v-else-if="lastPage === parameters.page") Ya cargaste todos los productos
        button.btn.i-send(
          v-else-if="!mqMobile"
          @click='loadMoreProducts') Ver más productos
      Loader(v-else)
  ul.pagination(v-if="pager")
    li.pagination__select
      select.form__select.form__select_small(
        name="numeroItems",
        v-model='parameters.items',
        @change='updateProductList')
          option(value="12") 12
          option(value="24") 24
          option(value="33") 33
          option(value="42") 42
    li.pagination__item(
      v-if='parameters.page > lastPage')
      a.pagination__arrow.pagination__arrow_prev.i-back(
        @click.prevent='prevPage'
        href="#")
    li.pagination__item {{ parameters.page }}
    li.pagination__item.pagination__item_txt de {{ lastPage }}
    li.pagination__item(
        v-if='parameters.page < lastPage')
      a.pagination__arrow.pagination__arrow_next.i-next(
        @click.prevent='nextPage'
        href="#")

</template>

<script>
import { mapState } from 'vuex'
import productAPI from '@/api/product'
import FilterDesk from '@/components/FilterDesk'
import FilterMobile from '@/components/FilterMobile'

export default {
  name: 'GridProducto',
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
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      products: [],
      lastPage: null,
      parameters: {
        'page': 1,
        'items': 12,
        'orderby': '-id'
      },
      loading: true,
      enableFavorite: false
    }
  },
  watch: {
    mqMobile (mqMobile) {
      if (mqMobile) {
        window.addEventListener('scroll', this.handleScroll)
        return
      }
      window.removeEventListener('scroll', this.handleScroll)
    },
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
        productAPI.get(this.parameters)
          .then((response) => {
            this.products.push(...response.data.data)
            this.loading = false
          })
      }
    },
    handleScroll: function (e) {
      if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.loading) {
        if (this.lastPage > this.parameters.page) this.loadMoreProducts()
      }
    },
    setParameters: function (setFilters) {
      Object.keys(setFilters).forEach(key => {
        this.parameters[key] = setFilters[key]
      })
      if (this.infinite) {
        this.parameters.page = 1
      }
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
    this.applyPreFilter()
    this.updateProductList()
  }
}
</script>
