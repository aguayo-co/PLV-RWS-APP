<template lang="pug">
.tabs
  //- nav.tabs__nav(v-if="mqMobile")
  //- nav.tabs__nav
  //-   p.tabs__nav-btn
  //-     span.tabs__nav-link.tabs__list-inner(@click.stop="openToggle") {{ orderOptions.options[orderOptions.selected].name }}
  //-     transition(name='toggle-scale')
  //-       ul.tabs__nav-list(v-show="activeToggle")
  //-         li.tabs__nav-item(v-for="option in orderOptions.options")
  //-           a.tabs__nav-link(href="#",
  //-             @click.prevent="tabActive1",
  //-             :class="{tabActive: tabsActive1 == true}") {{ option.name }}
  //- nav.tabs__nav(v-if="mqDesk")
  nav.tabs__nav
    p.tabs__inner
      span.tabs__nav-btn(@click.stop="openToggle") {{ navOptions.options[navOptions.selected].name }}
      ul.tabs__nav-list(:class="{openlist: activeToggle == true}")
        li.tabs__nav-item
          a.tabs__nav-link(href="#",
            @click.prevent="tabActive1",
            :class="{tabActive: tabsActive1 == true}") Prendas Publicadas
        li.tabs__nav-item
          a.tabs__nav-link(href="#",
            @click.prevent="tabActive2",
            :class="{tabActive: tabsActive2 == true}") Productos vendidos
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
          .slot__product-inner
            a.slot__product(
              :href='product.slug + "__" + product.id',
              :title='product.title')
              img.slot__img(
                :src="product.images[0]",
                alt="product.title")
              //- Eliminar producto
              .slot__product-actions(v-if="mqMobile")
                a.slot__actions-link.i-edit-line(href="#")
                a.slot__actions-link.i-trash(href="#")
              .slot__product-actions(v-if="mqDesk")
                a.slot__actions-link.i-edit-line(href="#")
                  transition(name='toggle-scale')
                    p.slot__tooltip Editar producto
                a.slot__actions-link.i-trash(href="#")
                  transition(name='toggle-scale')
                    p.slot__tooltip Eliminar producto
              //- Producto en proceso de compra
              //- .slot__product-alert
              //-   p.slot__alert-txt  Este producto está siendo comprado.
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
      products: [],
      activeToggle: false,
      navOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Prendas Publicadas' },
          { id: 1, name: 'Productos vendidos' }
        ]
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
    tabActive1: function () {
      this.tabsActive1 = true
      this.tabsActive2 = false
      this.activeToggle = false
    },
    tabActive2: function () {
      this.tabsActive2 = true
      this.tabsActive1 = false
      this.activeToggle = false
    },
    openToggle: function () {
      this.activeToggle = !this.activeToggle  
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
