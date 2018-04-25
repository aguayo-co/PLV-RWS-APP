<template lang="pug">
.layout-page
  BannerTop
  .layout-inner
    nav.filtrate
      .filtrate__item
        form.filtrate(action='', method='GET')
          .filtrate__row.i-search
            input.filtrate__input#searchMain(type='text', name='search', placeholder="Buscar")
      .filtrate__item
        span.filtrate__btn(@click.stop="openList") {{ listOptions.options[listOptions.selected].name }}
        transition(name='toggle-scale')
          ul.filtrate__list(v-if="listActive")
            li.filtrate__list-item(
              @click.stop.stop="changeOrder(option.id)"
              v-for="option in listOptions.options") {{ option.name }}
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
      prilovers: [],
      listActive: false,
      item: null,
      listOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Todas' },
          { id: 1, name: 'Prilover' },
          { id: 2, name: 'Prilover Star' },
          { id: 3, name: 'It girls' }
        ]
      }
    }
  },
  created: function () {
    usersAPI.getAll()
      .then(response => {
        this.prilovers = response.data.data
      })
  },
  methods: {
    openList: function () {
      this.listActive = !this.listActive
    },
    changeOrder: function (listOptionId) {
      this.listOptions.selected = listOptionId
      this.listActive = false
    }
  }
}
</script>
