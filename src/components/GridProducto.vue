<template lang="pug">
.section_filter
  ul.filter
    li.filter__select(
    v-for='(filterItem , index) in filterItems',
    :class="{ 'filter__select_open' :selected == index, 'filter__select_close' : active }",
    @click="openFilter(index), selected == index")
      span.filter__arrow {{ filterItem.name }}
      .filter__select-inner
        ul.filter__list
          li.filter__item(
            v-for="category in categories") {{ category.name }}
    li.filter__slide
      .filter__label Precio <span>(CLP)</span>
      .filter__set
        vue-slider(
          ref="slider"
          v-bind="sliderPrice"
          v-model="sliderPrice.value")
        .filter__tooltip
          small.filter__value ${{ sliderPrice.value[0] }}
          small.filter__value ${{ sliderPrice.value[1] }} +

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
            .slot__size
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

</template>

<script>
import productAPI from '@/api/product'
import vueSlider from 'vue-slider-component'

export default {
  name: 'GridProducto',
  props: ['infinite'],
  components: {
    vueSlider
  },
  data () {
    return {
      isActive: undefined,
      filterItems: [
        {
          name: 'Prenda'
        },
        {
          name: 'Talla'
        },
        {
          name: 'Marca'
        },
        {
          name: 'Color'
        },
        {
          name: 'Condición'
        },
        {
          name: 'Región'
        }
      ],
      products: [],
      conditions: {},
      categories: {},
      colors: {},
      brands: {},
      sizes: {},
      items: 8,
      page: 1,
      loading: false,
      selected: undefined,
      active: false,
      sliderPrice: {
        value: [
          '5000',
          '150000'
        ],
        width: '100%',
        height: 1,
        min: 5000,
        max: 150000,
        interval: 5000,
        piecewise: true,
        formatter: '$ {value}',
        tooltip: 'false',
        piecewiseStyle: {
          'visibility': 'hidden'
        },
        bgStyle: {
          'backgroundColor': '#000'
        },
        processStyle: {
          'backgroundColor': '#fe7676'
        },
        sliderStyle: {
          'boxShadow': 'none',
          'border': '1px solid #000'
        }
      }
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
      await productAPI.getProducts(this.page, this.items)
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
    openFilter: function (index) {
      this.selected = index
    }
  },
  created: function () {
    if (this.infinite) window.addEventListener('scroll', this.handleScroll)
    productAPI.getProducts(this.page, this.items)
      .then((response) => {
        this.products = response.data.data
      })
    productAPI.getCategoriesBySlug('shop')
      .then(response => {
        this.categories = response.data.children
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllConditions()
      .then(response => {
        this.conditions = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllColors()
      .then(response => {
        this.colors = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllBrands()
      .then(response => {
        this.brands = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
    productAPI.getAllSizes()
      .then(response => {
        this.sizes = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
