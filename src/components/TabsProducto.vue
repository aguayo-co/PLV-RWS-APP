<template lang="pug">
.tabs
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
      .alert-msg.alert-msg_center.alert-msg_top.i-alert(v-if="user.vacation_mode && products.length > 0")
          p Tienes habilitado el modo vacaciones. Todos tus productos están deshabilitados.
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="products.length === 0")
          p Aún no hay productos en tu closet <router-link class="link_underline" :to="{ name: 'publicar-venta' }">Publica tu primer producto</router-link>
      .product-grid.product-grid_small
        article.slot.slot_grid(
          v-for='product in products',
          :class="{ 'slot_disabled' : user.vacation_mode }")
          a.slot__ico.i-heart(
            @click.prevent='myActive(product)'
            :class='{active: isActive == product}'
            href='#'
            title='Agrega a Favoritos') Agregar a Favoritos
          .slot__product-inner
            router-link.slot__product(
              :to="{ name: 'product', params: { slug: product.title + '__' + product.id }}",
              :title='product.title')
              img.slot__img(
                :src="product.images[0]",
                :alt="'Foto de ' + product.title")
              //- Eliminar producto
              .slot__product-actions(v-if="mqMobile && !user.vacation_mode")
                a.slot__actions-link.i-edit-line(href="#")
                a.slot__actions-link.i-trash(href="#")
              .slot__product-actions(v-if="mqDesk && !user.vacation_mode")
                router-link.slot__actions-link.i-edit-line(:to="{ name: 'editar-producto', params: { productId: product.id }}")
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
                span.tool-user__letter(v-else) {{ product.user.first_name.charAt(0) }}
            .slot__user-info
              .slot__prilover {{ product.user.first_name }} {{ product.user.last_name }}
              .group(v-if='product.user.groups.length > 0')
                .slot__group.i-it-girl(
                  v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
                .slot__group.i-star-on(
                  v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
      ul.pagination(v-if="products.length > 12")
        li.pagination__item.pagination__label Mostrando
        li.pagination__select
          select.form__select.form__select_small(
            name="numeroItems",
            v-model='productsPager.items',
            @change='updateProductList')
              option(value="12") 12
              option(value="24") 24
              option(value="36") 36
              option(value="48") 48
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(
            @click.prevent="prevPage('active')"
            href="#")
        li.pagination__item.pagination__label Página
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de {{ productsPager.total }}
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(
            @click.prevent="nextPage('active')"
            href="#")
    .tab(v-if="tabsActive2")
      .product-grid.product-grid_small
        article.slot.slot_grid(
          v-for='product in soldProducts')
          .slot__product
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
          .slot__user(
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
      ul.pagination(v-if="soldProducts.length > 12")
        li.pagination__item.pagination__label Mostrando
        li.pagination__select
          select.form__select.form__select_small(
            name="numeroItems",
            v-model='soldProductsPager.items',
            @change='updateSoldProductList')
              option(value="12") 12
              option(value="24") 24
              option(value="36") 36
              option(value="48") 48
        li.pagination__item
          a.pagination__arrow.pagination__arrow_prev.i-back(
            @click.prevent="prevPage('sold')"
            href="#")
        li.pagination__item.pagination__label Página
        li.pagination__item 1
        li.pagination__item.pagination__item_txt de {{ soldProductsPager.total }}
        li.pagination__item
          a.pagination__arrow.pagination__arrow_next.i-next(
            @click.prevent="nextPage('sold')"
            href="#")
</template>

<script>

import productAPI from '@/api/product'

export default {
  name: 'TabsProducto',
  props: ['user'],
  data () {
    return {
      orderBy: '-id',
      isActive: undefined,
      tabsActive1: true,
      tabsActive2: false,
      products: [],
      soldProducts: [],
      activeToggle: false,
      navOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Prendas Publicadas' },
          { id: 1, name: 'Productos vendidos' }
        ]
      },
      productsPager: {
        items: 12,
        page: 1,
        total: 1
      },
      soldProductsPager: {
        items: 12,
        page: 1,
        total: 1
      }
    }
  },
  methods: {
    updateProductList: function () {
      let filterQueryObject = {}
      filterQueryObject.status = '10,19'
      filterQueryObject.user_id = this.user.id
      productAPI.getProducts(this.productsPager.page, this.productsPager.items, filterQueryObject, this.orderBy)
        .then((response) => {
          this.products = response.data.data
          this.productsPager.total = response.data.last_page
        })
    },
    updateSoldProductList: function (status) {
      let filterQueryObject = {}
      filterQueryObject.status = '30,32'
      filterQueryObject.user_id = this.user.id
      productAPI.getProducts(this.productsPager.page, this.productsPager.items, filterQueryObject, this.orderBy)
        .then((response) => {
          this.soldProducts = response.data.data
          this.soldProductsPager.total = response.data.last_page
        })
    },
    nextPage: function (status) {
      if (status === 'active' && this.productsPage.page + 1 < this.productsPager.total) this.productsPager.page += 1
      if (status === 'sold' && this.soldProductsPage.page + 1 < this.soldProductsPager.total) this.soldProductsPager.page += 1
    },
    prevPage: function (status) {
      if (status === 'active' && this.productsPage.page > 2) this.productsPager.page -= 1
      if (status === 'sold' && this.soldProductsPage.page > 2) this.soldProductsPager.page -= 1
    },
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
  mounted: function () {
    this.updateProductList()
    this.updateSoldProductList()
  }
}
</script>
