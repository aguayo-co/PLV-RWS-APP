<template lang="pug">
  //- banner promociones grid
  //- TO-DO: consumir servicios
  .slider-fullwide
    swiper(
      :options='swiperOption')
      swiper-slide(
        v-for="(user, index) in users" :key="index")
        router-link.slide-group__item(:to="'/closet/' + user.id")
          .slide-group__avatar
            img.slide-group__picture(
              :src='user.picture',
              :alt='user.first_name')
          .slide-group__name {{ user.full_name }}

          .slide-group__type.i-it-girl(
            v-if='user.group_ids.indexOf($store.getters["ui/itGirlId"]) !== -1') It <span class="txt_brand">girl</span>
          .slide-group__type.i-star-on(
            v-if='user.group_ids.indexOf($store.getters["ui/priloverStarId"]) !== -1') Prilover <span class="txt_brand">Star</span>
      .swiper-pagination(slot='pagination')

    .slider-fullwide__footer(
      v-if="mqTablet")
      router-link.link_underline(:to="{ name : 'ser-prilover' }") Más sobre Prilover Star

</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import usersAPI from '@/api/user'

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
      users: []
    }
  },
  created: function () {
    usersAPI.getUsersByGroup('2')
      .then(response => {
        this.users = response.data.data
      })
  }
}
</script>
