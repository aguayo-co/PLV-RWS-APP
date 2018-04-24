<template lang="pug">
.layout-page
  BannerTop
  .section_product
    article.card
      figure.card__circle
        img.card__photo(
          src='static/img/demo/user-avatar-001.jpg',
          alt='')
      h2.card__title
      p.card__meta 9 Productos
      ul.user-data__list
        li.user-data__value.i-like 20
        li.user-data__value.i-like.i_flip 0
        li.user-data__value.i-less-circle 0
      .card__group
        .slot__group.i-it-girl(
          v-show="true") It <span class="txt_brand">girl</span>
        .slot__group.i-star-on(
          v-show="false") Prilover <span class="txt_brand">Star</span>
</template>

<script>
import BannerTop from '@/components/BannerTop'

export default {
  name: 'Prilovers',
  components: {
    BannerTop
  }
}
</script>
