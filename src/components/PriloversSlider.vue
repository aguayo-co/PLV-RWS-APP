<template lang="pug">
  //- banner promociones grid
  //- TO-DO: consumir servicios
  .slider-fullwide
    swiper(
      :options='swiperOption')
      swiper-slide(
        v-for="(user, index) in users" :key="index")
        a.slide-group__item(:href='user.url')
          .slide-group__avatar
            img.slide-group__picture(
              :src='user.picture',
              :alt='user.first_name')
          .slide-group__name {{ user.first_name }} {{ user.last_name }}

          .slide-group__type.i-it-girl(
            v-if='user.slot__group == 1') It <span class="txt_brand">girl</span>
          .slide-group__type.i-star-on(
            v-if='user.slot__group == 2') Prilover <span class="txt_brand">Star</span>
      .swiper-pagination(slot='pagination')

    .slider-fullwide__footer(
      v-if="mqTablet")
      a.link_underline(href="#") Más sobre PriloverStars
      a.link_underline(href="#") Más sobre IT Girls

</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// - import usersAPI from '@/api/user'

export default {
  name: 'PriloversSlider',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 8,
        spaceBetween: 40,
        freeMode: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
          clickable: true
        },
        breakpoints: {
          1280: {
            slidesPerView: 6
          },
          1024: {
            slidesPerView: 5
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          370: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      },
      users: [
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-001.jpg',
          first_name: 'Mariana',
          last_name: 'Gómez',
          slot__group: '1'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-002.jpg',
          first_name: 'Vale',
          last_name: 'Caballero',
          slot__group: '0'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-003.jpg',
          first_name: 'Juliana',
          last_name: 'Rocha',
          slot__group: '2'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-004.jpg',
          first_name: 'Genevieve',
          last_name: 'Gibson',
          slot__group: '1'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-005.jpg',
          first_name: 'Giovanna',
          last_name: 'Bustos',
          slot__group: '0'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-006.jpg',
          first_name: 'Dani',
          last_name: 'Herzko',
          slot__group: '0'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-007.jpg',
          first_name: 'Trini',
          last_name: 'Garcés ',
          slot__group: '2'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-008.jpg',
          first_name: 'Loreto',
          last_name: '',
          slot__group: '0'
        },
        {
          url: '/',
          picture: '/static/img/demo/user-avatar-009.jpg',
          first_name: 'Isi',
          last_name: 'Fierro',
          slot__group: '0'
        }
      ]
    }
  },
  created: function () {
    // - usersAPI.getUsersByGroup('3')
    // -  .then(response => {
    // -    this.users = response.data.data
    // -  })
  }
}
</script>
