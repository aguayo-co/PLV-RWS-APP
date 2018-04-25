<template lang="pug">
.layout-page
  BannerTop
  .layout-inner
    .card__grid
      article.card(v-for="user in prilovers")
        figure.card__circle
          img.card__photo(
            v-if="user.picture"
            :src='user.picture',
            alt='')
        h2.card__name {{ user.first_name }} {{ user.last_name }}
        p.card__meta.i-bag {{ user.published_products_count }} Productos
        ul.user-data__list
          li.user-data__value.i-like {{ user.followers_count }}
          li.user-data__value.i-like.i_flip 0
          li.user-data__value.i-less-circle 0
        .card__group
          .slot__group.i-it-girl(
            v-show="true") It <span class="txt_brand">girl</span>
          .slot__group.i-star-on(
            v-show="false") Prilover <span class="txt_brand">Star</span>
    .section_product__footer
      p.btn__wrapper
        a.btn Ver más Prilovers
</template>

<script>
import BannerTop from '@/components/BannerTop'
import usersAPI from '@/api/user'

export default {
  name: 'Prilovers',
  components: {
    BannerTop
  },
  data () {
    return {
      prilovers: []
    }
  },
  created: function () {
    usersAPI.getAll()
      .then(response => {
        this.prilovers = response.data.data
      })
  }
}
</script>
