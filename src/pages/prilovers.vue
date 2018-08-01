<template lang="pug">
.layout-page
  BannerTop
  .layout-inner.layout_filtrate
    nav.filtrate
      .filtrate__item
        form.filtrate(
          @submit.prevent="updateUserList(true)")
          .filtrate__row.i-search
            input.filtrate__input(
              v-model="parameters.q",
              type='search',
              name='search',
              placeholder="Buscar")
      .filtrate__item
        span.filtrate__btn(
          @click.stop="openList") {{ listOptions.options[listOptions.selected].name }}
        transition(name='toggle-scale')
          ul.filtrate__list(
            v-if="listActive")
            li.filtrate__list-item(
              @click.stop.stop="changeOrder(option.id)"
              v-for="option in listOptions.options") {{ option.name }}
    .card__grid
      article.card(v-for="user in prilovers")
        router-link.card__link(
          :to="{ name: 'closet', params: { userId: user.id }}",
          :title="'Ir al Closet de ' + user.first_name")
          figure.card__circle
            img.card__photo(
              v-if="user.picture"
              :src='user.picture',
              :alt='user.first_name')
            span.tool-user__letter(v-else) {{ user.first_name.charAt(0) }}
          h2.card__name {{ user | full_name }}
          p.card__meta.i-bag {{ user.published_products_count }} Productos
          ul.user-data__list
            li.user-data__value.i-like {{ user.ratings_positive_count }}
            li.user-data__value.i-like.i_flip {{ user.ratings_negative_count }}
            li.user-data__value.i-less-circle {{ user.ratings_neutral_count }}
          //- Fix Issue #106 se integra funcionalidad para grupos
          .card__group
            .slot__group.i-star-on(
              v-if='user.group_ids.indexOf(1) > -1') Prilover <span class="txt_brand">Star</span>
            .slot__group.i-it-girl(
              v-if='user.group_ids.indexOf(2) > -1') It <span class="txt_brand">girl</span>

    .section_product__footer
      Pager(
        v-model='prilovers'
        v-on:paging="loading = $event"
        :forcedParams='parameters'
        :basePath='basePath'
        :infinite='true')
  ButtonSticky
</template>

<script>
import BannerTop from '@/components/BannerTop'
import userAPI from '@/api/user'
import ButtonSticky from '@/components/ButtonSticky'
import Pager from '@/components/Pager'

export default {
  name: 'Prilovers',
  components: {
    Pager,
    BannerTop,
    ButtonSticky
  },
  data () {
    return {
      basePath: userAPI.basePath,
      prilovers: [],
      listActive: false,
      loading: true,
      listOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Todas' },
          { id: 1, name: 'Prilover Star' },
          { id: 2, name: 'It Girl' }
        ]
      },
      parameters: {
        items: 12,
        orderby: '-latest_product',
        'filter[with_products]': 1
      }
    }
  },
  methods: {
    openList () {
      this.listActive = !this.listActive
    },
    changeOrder (listOptionId) {
      const parameters = {...this.parameters}
      this.listOptions.selected = listOptionId
      this.listActive = false
      if (this.listOptions.selected === 0) {
        delete parameters['filter[group_ids]']
      } else {
        parameters['filter[group_ids]'] = listOptionId
      }
      this.parameters = parameters
    }
  }
}
</script>
