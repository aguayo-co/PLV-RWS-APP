<template lang="pug">
.section_filter
  ul.filter
    li.filter__select Prenda
      ul.filter__list
        li.filter__item(
          v-for="category in categories") {{ category.name }}
    li.filter__select Talla
      ul.filter__list
        li.filter__item(
          v-for="size in sizes") {{ size.name }}
    li.filter__select Marca
      ul.filter__list
        li.filter__item(
          v-for="brand in brands") {{ brand.name }}
    li.filter__select Color
      ul.filter__list
        li.filter__item(
          v-for="color in colors") {{ color.name }}
    li.filter__select Condición
      ul.filter__list
        li.filter__item(
          v-for="condition in conditions") {{ condition.name }}
    li.filter__select Región
      ul.filter__list
        li.filter__item Región Metropolitana
    li.filter__slide Precio (CLP)

  Prenda
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

export default {
  name: 'GridProducto',
  props: ['infinite'],
  data () {
    return {
      isActive: undefined,
      products: [],
      conditions: {},
      categories: {},
      colors: {},
      brands: {},
      sizes: {},
      items: 8,
      page: 1,
      loading: false
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
