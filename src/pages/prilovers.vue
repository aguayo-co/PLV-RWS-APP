<template lang="pug">
.layout-page
  BannerTop
  .section_product
    article.card(v-for="user in prilovers")
      figure.card__circle
        img.card__photo(
          v-if="user.picture"
          :src='user.picture',
          alt='')
      h2.card__title
      p.card__meta {{ user.published_products_count }} Productos
      ul.user-data__list
        li.user-data__value.i-like {{ user.followers_count }}
        li.user-data__value.i-like.i_flip 0
        li.user-data__value.i-less-circle 0
      .card__group(v-for="group in user.groups")
        .slot__group(:class="'i-' + group.slug") {{ group.name }}

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
