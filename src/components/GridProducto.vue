<template lang="pug">
.section_filter
  //- filter Mobile
  FilterMobile(
    @filterChange="computeFilters",
    :filter="filterValues",
    v-if="mqMobile",
    @clearFilters="clearFilters")
  //- filter desktop
  FilterDesk(
    @filterChange="computeFilters",
    @setFilters="setFilters(filterObject)",
    :filter="filterValues",
    v-if="mqDesk",
    :compact="compact")
  .section_product__scroll
    .product-grid
      article.slot.slot_grid(
        v-for='product in products')
        button.slot__ico.i-heart(
          v-if="user.id"
          @click.prevent='setFavorite(product.id)'
          :class='{ active: user.favorites_ids.includes(product.id) }'
          title='Agrega a Favoritos') Agregar a Favoritos
        router-link.slot__product(
          :to="{ name: 'product', params: { slug: product.title + '__' + product.id }}",
          :title='product.title')
          img.slot__img(
            :src="product.images[0]",
            :alt="'Foto de ' + product.title")

          //-title/dimensions
          .slot__lead
            .slot__title {{ product.title }}
            .slot__size(
              v-if="product.size")
              .slot__size-txt {{ product.size.name }}

          //- brand/price
          .slot__info
            .slot__brand {{ product.brand.name }}
            .slot__price ${{ product.price | currency }}

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
            .slot__prilover {{ product.user.first_name }} {{ product.user.last_name }}
            .group(v-if='product.user.groups.length > 0')
              .slot__group.i-it-girl(
                v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
              .slot__group.i-star-on(
                v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
    .section_product__footer
      p.btn__wrapper(
        v-if='!loading && !mqMobile && infinite')
        a.btn.i-send(
          @click='loadMoreProducts') Ver más productos
      p.preload(v-if='loading')
        span.preload__spin.preload__spin_1
        span.preload__spin.preload__spin_2
        span.preload__spin.preload__spin_3
        span.preload__spin.preload__spin_4
  ul.pagination(v-if="pager")
    li.pagination__select
      select.form__select.form__select_small(
        name="numeroItems",
        v-model='items',
        @change='updateProductList')
          option(value="9") 9
          option(value="18") 18
          option(value="27") 27
          option(value="45") 45
    li.pagination__item(
      v-if='page > lastPage')
      a.pagination__arrow.pagination__arrow_prev.i-back(
        @click.prevent='prevPage'
        href="#")
    li.pagination__item {{ page }}
    li.pagination__item.pagination__item_txt de {{ lastPage }}
    li.pagination__item(
        v-if='page < lastPage')
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
    'preFilter',
    'search'
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
      isActive: undefined,
      products: [],
      items: 18,
      page: 1,
      lastPage: null,
      filter: {},
      filterValues: {
        category: [],
        size: [],
        brand: [],
        color: [],
        condition: [],
        region: [],
        price: null,
        order: null
      },
      orderBy: '-id',
      filterQueryObject: {},
      searchQuery: null,
      loading: false,
      active: false
    }
  },
  watch: {
    search: function () {
      if (this.search) this.searchQuery = this.search
      this.filterQueryObject.status = '10,19'
      if (this.infinite) window.addEventListener('scroll', this.handleScroll)
      productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy, this.searchQuery)
        .then((response) => {
          this.products = response.data.data
          this.$emit('queryDoneResults', response.data.total)
        })
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
    loadMoreProducts: async function (e) {
      if (this.lastPage > this.page) {
        this.page += 1
        this.loading = true
        await productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy)
          .then((response) => {
            this.products.push(...response.data.data)
            this.loading = false
          })
      }
    },
    handleScroll: function (e) {
      if (this.mqMobile && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.loading) {
        if (this.lastPage > this.page) this.loadMoreProducts()
      }
    },
    computeFilters: async function () {
      this.loading = true
      this.products = []
      this.filterQueryObject = {
        category_id: this.filterValues.category.join(','),
        size_id: this.filterValues.size.join(','),
        brand_id: this.filterValues.brand.join(','),
        color_id: this.filterValues.color.join(','),
        condition_id: this.filterValues.condition.join(','),
        region_id: this.filterValues.region.join(','),
        price: this.filterValues.price
      }
      this.orderBy = this.filterValues.order || this.orderBy
      await productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy)
        .then((response) => {
          this.loading = false
          this.products = response.data.data
          this.page = 1
        })
    },
    clearFilters: function () {
      this.filterValues = {
        category: [],
        size: [],
        brand: [],
        color: [],
        condition: [],
        region: [],
        price: null,
        order: null
      }
    },
    updateProductList: function () {
      productAPI.getProducts(this.page, this.items, this.filter)
        .then(response => {
          this.products = response.data.data
          this.lastPage = response.data.last_page
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateProductList()
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateProductList()
    },
    setFilters: function (filterObject) {
      this.filterValues = {...filterObject}
    }
  },
  beforeMount: function () {
    if (this.preFilter) {
      this.filterQueryObject = this.preFilter
    }
    if (this.search) this.searchQuery = this.search
    this.filterQueryObject.status = '10,19'
    if (this.infinite) window.addEventListener('scroll', this.handleScroll)
    productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy, this.searchQuery)
      .then((response) => {
        this.products = response.data.data
        this.lastPage = response.data.last_page
        this.$emit('queryDoneResults', response.data.total)
      })
  }
}
</script>
