<template lang="pug">

section.layout-inner
  header.section__subhead
    h2.title_head.title_head-small Otros productos que <span class="txt_brand">te pueden gustar</span>
    h3.title_subhead(
      v-if="mqTablet") Elegimos estos productos pensando en ti
  //- banner promociones grid
  //- TO-DO: consumir servicios
  .slider-slot
    swiper(:options='swiperOption')
      swiper-slide(
        v-for='(product, index) in products' :key='index')
        article.slot
          button.slot__ico.i-heart(
            v-if="user.id && user.id !== product.user_id"
            @click.prevent='setFavorite(product)'
            :class='{ enableFavorite: user.favorites_ids.includes(product.id) }'
            title='Agrega a Favoritos') Agregar a Favoritos
          router-link.slot__product(
            :to="{ name: 'product', params: { slug: product.slug + '__' + product.id }}",
            :title='product.title')
            img.slot__img(
              :src="product.images[0]",
              alt="'Foto de ' + product.title")

            //-title/dimensions
            .slot__lead
              .slot__title {{ product.title }}
              .slot__size(
                v-if="product.size")
                .slot__size-txt {{ product.size.name }}

            //- brand/price
            .slot__info
              .slot__brand {{ product.brand.name }}
              div(v-if="product.sale_price !== product.price") {{ product | discount }}% de descuento
              .through(v-if="product.sale_price !== product.price") ${{ product.price | currency }}
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
              .slot__prilover {{ product.user.full_name }}
              .group(v-if='product.user.groups.length > 0')
                .slot__group.i-it-girl(
                  v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
                .slot__group.i-star-on(
                  v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
      //- Paginador Arrow
      .swiper-button-next.i-next-s(slot='button-prev')
      .swiper-button-prev.i-back-s(slot='button-next')
</template>

<script>
import productAPI from '@/api/product'
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapState } from 'vuex'

export default {
  name: 'ProductoSlider',
  components: {
    swiper,
    swiperSlide
  },
  props: ['category_id', 'product_id'],
  data () {
    return {
      orderby: '-id',
      products: [],
      productsPager: {
        items: 12,
        page: 1,
        total: 1
      },
      isActive: undefined,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 44,
        freeMode: true,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1280: {
            slidesPerView: 3,
            spaceBetween: 50
          },
          868: {
            spaceBetween: 30
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 50
          },
          550: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          450: {
            slidesPerView: 1,
            spaceBetween: 50
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    '$route.params': function () {
      this.updateProductList()
    }
  },
  methods: {
    setFavorite: function (product) {
      let data = {
        id: this.user.id
      }
      this.user.favorites_ids.includes(product.id) ? data.favorites_remove = [product.id] : data.favorites_add = [product.id]
      this.$store.dispatch('user/update', data)
    },
    updateProductList: function () {
      let filterQueryObject = {}
      filterQueryObject.status = '10,19'
      filterQueryObject.category_id = this.category_id
      productAPI.getProducts(this.productsPager.page, this.productsPager.items, filterQueryObject, this.orderby)
        .then((response) => {
          this.products = response.data.data
          this.products = this.products.filter(product => product.id !== this.product_id)
          this.productsPager.total = response.data.last_page
        })
    }
  },
  mounted: function () {
    this.updateProductList()
  }
}
</script>
