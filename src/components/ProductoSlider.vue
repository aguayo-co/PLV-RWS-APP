<template lang="pug">

section.layout-inner
  header.section__subhead
    h2.title_head.title_head-small Otras prendas que <span class="txt_brand">te pueden interesar</span>
    h3.title_subhead(
      v-if="mqTablet") Elegimos otras prendas que creemos te pueden interesar
  //- banner promociones grid
  //- TO-DO: consumir servicios
  .slider-slot
    swiper(
      :options='swiperOption')
      swiper-slide(
        v-for='(product, index) in products' :key='index')
        article.slot
          a.slot__ico.i-heart(
            @click.prevent='myActive(product)'
            :class='{active: isActive == product}'
            href='#'
            title='Agrega a Favoritos') Agregar a Favoritos
          a.slot__product(
            :href='product.url',
            :title='product.title')
            img.slot__img(
              :src="product.file",
              alt="product.title")

            //-title/dimensions
            .slot__lead
              .slot__title {{ product.title }}
              .slot__size
                .slot__size-txt {{ product.dimensions }}

            //- brand/price
            .slot__info
              .slot__brand {{ product.brand }}
              .slot__price ${{ product.price }}

          //- user: picture/first_name/last_name
          a.slot__user(
            :href='product.user',
            :title='product.first_name')
            .slot__user-img
              .slot__avatar
                img.slot__picture(
                  :src="product.picture",
                  :alt="product.first_name")
            .slot__user-info
              .slot__prilover {{ product.first_name }} {{ product.last_name }}
              .slot__group.i-it-girl(
                v-if='product.slot__group == 1') It <span class="txt_brand">girl</span>
              .slot__group.i-star-on(
                v-if='product.slot__group == 2') Prilover <span class="txt_brand">Star</span>
      //- Paginador en este caso dots
      .swiper-button-next.i-next-s(slot='button-prev')
      .swiper-button-prev.i-back-s(slot='button-next')
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductoSlider',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
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
      },
      products: [
        {
          url: '/',
          title: 'Blusa Rayas',
          dimensions: 'm',
          brand: 'Nicopoly',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-001.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-009.jpg',
          first_name: 'Mariana',
          last_name: 'Gómez',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Chaqueta Mostaza',
          dimensions: 's',
          brand: 'Rubinella',
          price: '16.000',
          status_id: '',
          file: '/static/img/demo/product-002.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-007.jpg',
          first_name: 'Juliana',
          last_name: 'Rocha',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Vestido Maaji',
          dimensions: 's',
          brand: 'Maaji',
          price: '50.000',
          status_id: '',
          file: '/static/img/demo/product-003.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-005.jpg',
          first_name: 'Vale',
          last_name: 'Caballero',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Sandalias de Cuero y Tachas Saville Row',
          dimensions: 'xs',
          brand: 'Straadivaruois & Zara Home Juntos',
          price: '40.000',
          status_id: '',
          file: '/static/img/demo/product-004.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-003.jpg',
          first_name: 'Genevieve',
          last_name: 'Gibson',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Chaqueta Ecocuero Dorada',
          dimensions: 'm',
          brand: 'Soviet',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-005.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-001.jpg',
          first_name: 'Giovanna',
          last_name: 'Bustos',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Jeans Ripped',
          dimensions: '40',
          brand: 'Zara',
          price: '14.000',
          status_id: '',
          file: '/static/img/demo/product-006.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-002.jpg',
          first_name: 'Dani',
          last_name: 'Herzko',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Chaqueta Ecocuero Negra',
          dimensions: 's',
          brand: 'Forever 21 ',
          price: '15.000',
          status_id: '',
          file: '/static/img/demo/product-007.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-004.jpg',
          first_name: 'Trini',
          last_name: 'Garcés ',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Blazer Rojo',
          dimensions: '46',
          brand: 'Desconocida',
          price: '8.000',
          status_id: '',
          file: '/static/img/demo/product-008.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-006.jpg',
          first_name: 'Loreto',
          last_name: '',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Blusa H&M Studio',
          dimensions: 's',
          brand: 'H&M ',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-009.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-008.jpg',
          first_name: 'Isi',
          last_name: 'Fierro',
          slot__group: '2'
        }
      ]
    }
  },
  methods: {
    myActive: function (e) {
      this.isActive = e
    },
    NotActive: function (e) {
      this.isActive = undefined
    }
  }
}
</script>
