<template lang="pug">
.tabs
  nav.tabs__nav
    ul.tabs__nav-list
      li.tabs__nav-item
        a.tabs__nav-link(href="#",
          @click.prevent="tabActive1") Prendas Publicadas
      li.tabs__nav-item
        a.tabs__nav-link(href="#",
          @click.prevent="tabActive2") Productos vendidos
  .tabs__content
    .tab(v-if="tabsActive1")
      .product-grid.product-grid_small
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
    .tab(v-if="tabsActive2")
      .product-grid.product-grid_small
        p hola
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

</template>

<script>

import productAPI from '@/api/product'

export default {
  name: 'TabsProducto',
  data () {
    return {
      isActive: undefined,
      tabsActive1: true,
      tabsActive2: false,
      products: []
    }
  },
  methods: {
    myActive: function (e) {
      this.isActive = e
    },
    NotActive: function (e) {
      this.isActive = undefined
    },
    tabActive1: function () {
      this.tabsActive1 = true
      this.tabsActive2 = false
      console.log(this.tabsActive1)
    },
    tabActive2: function () {
      this.tabsActive2 = true
      this.tabsActive1 = false
      console.log(this.tabsActive2)
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
