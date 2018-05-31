<template lang="pug">
.section_filter
  //- filter Mobile
  //- FilterMobile(
    v-if="mqMobile")
  //- filter desktop
  //- FilterDesk(
    @filterChange="computeFilters",
    :filter="filterValues",
    v-if="mqDesk",
    :compact="compact")
  .section_product__scroll
    //- .preload(v-if="loading")
    //-   span.preload__spin.preload__spin_1
    //-   span.preload__spin.preload__spin_2
    //-   span.preload__spin.preload__spin_3
    //-   span.preload__spin.preload__spin_4
    //- .product-grid(v-else)
    .product-grid
      article.slot.slot_grid(
        v-for='product in products')
        button.slot__ico.i-heart(
          v-if="user.id"
          @click.prevent='setFavorite(product.id)'
          :class='{ enableFavorite: user.favorites_ids.includes(product.id) }'
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
      products: [],
      lastPage: null,
      parameters: {
        'page': 1,
        'items': 12,
        'orderBy': '-id'
      },
      loading: false,
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
      productAPI.get(this.parameters)
        .then((response) => {
          this.products = response.data.data
          this.lastPage = response.data.last_page
          this.loading = false
        })
    },
    loadMoreProducts: async function (e) {
      console.log('entro')
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
    computeFilters: async function () {
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
    }
  },
  created: function () {
    this.applyPreFilter()
    this.updateProductList()
  }
}
</script>
