<template lang="pug">
.section_filter
  //- filter Mobile
  FilterMobile(
    v-if="mqMobile")
  //- filter desktop
  FilterDesk(
    @filterChange="computeFilters",
    :filter="filterValues",
    v-if="mqDesk",
    :compact="compact")
  .section_product__scroll
    .product-grid
      article.slot.slot_grid(
        v-for='product in products')
        a.slot__ico.i-heart(
          @click.prevent='myActive(product)'
          :class='{active: isActive == product}'
          href='#'
          title='Agrega a Favoritos') Agregar a Favoritos
        a.slot__product(
          :href='product.slug + "__" + product.id',
          :title='product.title')
          img.slot__img(
            :src="product.images[0]",
            alt="product.title")

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
        a.slot__user(
          href='#',
          :title='product.user.first_name')
          .slot__user-img
            .slot__avatar
              img.slot__picture(
                v-if='product.user.picture'
                :src='product.user.picture',
                :alt='product.user.first_name')
              span.tool-user__letter(
                v-else
              ) {{ product.user.first_name.charAt(0) }}
          .slot__user-info
            .slot__prilover {{ product.user.first_name }} {{ product.user.last_name }}
            .group(v-if='product.user.groups.length > 0')
              .slot__group.i-it-girl(
                v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
              .slot__group.i-star-on(
                v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
    .section_product__footer
      p.btn__wrapper(
        v-if='!loading && !mqMobile')
        a.btn.i-send(
          @click='loadMoreProducts') Ver más prendas
      p.preload(v-if='loading')
        span.preload__spin.preload__spin_1
        span.preload__spin.preload__spin_2
        span.preload__spin.preload__spin_3
        span.preload__spin.preload__spin_4
  ul.pagination
    li.pagination__select
      select.form__select.form__select_small(
        name="numeroItems",
        v-model='items',
        @change='updateProductList')
          option(value="10") 10
          option(value="20") 20
          option(value="30") 30
          option(value="50") 50
    li.pagination__item
      a.pagination__arrow.pagination__arrow_prev.i-back(
        @click.prevent='prevPage'
        href="#")
    li.pagination__item {{ page }}
    li.pagination__item.pagination__item_txt de 3
    li.pagination__item
      a.pagination__arrow.pagination__arrow_next.i-next(
        @click.prevent='nextPage'
        href="#")

</template>

<script>
import productAPI from '@/api/product'
import FilterDesk from '@/components/FilterDesk'
import FilterMobile from '@/components/FilterMobile'

export default {
  name: 'GridProducto',
  props: [
    'infinite',
    'pager',
    'compact'
  ],
  components: {
    FilterDesk,
    FilterMobile
  },
  data () {
    return {
      isActive: undefined,
      products: [],
      items: 10,
      page: 1,
      filter: {},
      totalPages: null,
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
      orderBy: 'created_at',
      filterQueryObject: { },
      loading: false,
      active: false
    }
  },
  methods: {
    myActive: function (e) {
      this.isActive = e
    },
    NotActive: function (e) {
      this.isActive = undefined
    },
    loadMoreProducts: async function (e) {
      this.page += 1
      this.loading = true
      await productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy)
        .then((response) => {
          this.products.push(...response.data.data)
          this.loading = false
        })
    },
    handleScroll: function (e) {
      if (this.mqMobile && ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && !this.loading) {
        this.loadMoreProducts()
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
    updateProductList: function () {
      productAPI.getProducts(this.page, this.items, this.filter)
        .then(response => {
          this.products = response.data.data
        })
    },
    nextPage: function () {
      this.page += 1
      this.updateProductList()
    },
    prevPage: function () {
      if (this.page > 1) this.page -= 1
      this.updateProductList()
    }
  },
  created: function () {
    if (this.infinite) window.addEventListener('scroll', this.handleScroll)
    productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy)
      .then((response) => {
        this.products = response.data.data
      })
  }
}
</script>
