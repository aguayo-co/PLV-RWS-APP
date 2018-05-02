<template lang="pug">
.gridlight
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
      //- Producto 1
      article.slot.slot_grid
        .slot__product-inner
          a.slot__product.sold(
            href='#',
            title='Producto 1')
            img.slot__img(
              src="/static/img/demo/prod-instagram/vendido.png",
              alt="Producto 1")
          .slot__lead
            .slot__title Black Bike
            .slot__size
              .slot__size-txt XL

          //- brand/price
          .slot__info
            .slot__brand Straadivaruois
            .slot__price $40.000
      //- Producto 2
      article.slot.slot_grid
        .slot__product-inner
          a.slot__product(
            href='#',
            title='Producto 1')
            img.slot__img(
              src="/static/img/demo/prod-instagram/insta-2.png",
              alt="Producto 2")
          .slot__lead
            .slot__title Bike
            .slot__size
              .slot__size-txt L

          //- brand/price
          .slot__info
            .slot__brand Straadivaruois
            .slot__price $30.000
      //- Producto 3
      article.slot.slot_grid
        .slot__product-inner
          a.slot__product(
            href='#',
            title='Producto 1')
            img.slot__img(
              src="/static/img/demo/prod-instagram/insta-3.png",
              alt="Producto 3")
          .slot__lead
            .slot__title Black
            .slot__size
              .slot__size-txt XS

          //- brand/price
          .slot__info
            .slot__brand Straadivaruois
            .slot__price $20.000
      //- Producto 4
      article.slot.slot_grid
        .slot__product-inner
          a.slot__product(
            href='#',
            title='Producto 1')
            img.slot__img(
              src="/static/img/demo/prod-instagram/insta-4.png",
              alt="Producto 4")
          .slot__lead
            .slot__title Black Bike
            .slot__size
              .slot__size-txt XXL

          //- brand/price
          .slot__info
            .slot__brand Straadivaruois
            .slot__price $40.000
      //- Producto 5
      article.slot.slot_grid
        .slot__product-inner
          a.slot__product(
            href='#',
            title='Producto 1')
            img.slot__img(
              src="/static/img/demo/prod-instagram/insta-5.png",
              alt="Producto 5")
          .slot__lead
            .slot__title Bike
            .slot__size
              .slot__size-txt M

          //- brand/price
          .slot__info
            .slot__brand Straadivaruois
            .slot__price $50.000
      //- Producto 6
      article.slot.slot_grid
        .slot__product-inner
          a.slot__product(
            href='#',
            title='Producto 6')
            img.slot__img(
              src="/static/img/demo/prod-instagram/insta-6.png",
              alt="Producto 6")
          .slot__lead
            .slot__title Zapatos
            .slot__size
              .slot__size-txt XXS

          //- brand/price
          .slot__info
            .slot__brand Straadivaruois
            .slot__price $70.000
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
      filterQueryObject: {},
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
    if (this.preFilter) {
      this.filterQueryObject = this.preFilter
    }
    if (this.infinite) window.addEventListener('scroll', this.handleScroll)
    productAPI.getProducts(this.page, this.items, this.filterQueryObject, this.orderBy)
      .then((response) => {
        this.products = response.data.data
      })
  }
}
</script>
