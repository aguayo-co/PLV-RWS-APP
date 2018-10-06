<template lang="pug">
.layout-page
  BannerTop
  .layout-inner.layout_filtrate
    nav.filtrate
      .filtrate__item
        form.filtrate(
          @submit.prevent="changeSearch")
          .filtrate__row.i-search
            input.filtrate__input(
              v-model="searchQuery",
              type='search',
              name='search',
              placeholder="Buscar")
            button(
              style="position: absolute; left: -9999px"
              type='submit')
      .filtrate__item
        span.filtrate__btn(
          @click.stop="openList") {{ listOptions.find(option => option.id === listOptionsSelected).name }}
        transition(name='toggle-scale')
          ul.filtrate__list(
            v-if="listActive")
            li.filtrate__list-item(
              @click.stop.stop="changeOrder(option.id)"
              v-for="option in listOptions") {{ option.name }}
    .card__grid
      article.card(v-for="user in prilovers" :key="user.id")
        router-link.card__link(
          :to="{ name: 'closet', params: { userId: user.id }}",
          :title="'Ir al Closet de ' + user.first_name")
          figure.card__circle
            img.card__photo(
              v-if="user.picture"
              :src='user.picture',
              :alt='user.first_name')
            span.tool-user__letter(v-else) {{ user.first_name.charAt(0) }}
          h2.card__name {{ user.full_name }}
          p.card__meta.i-bag {{ user.published_products_count }} Productos
          ul.user-data__list
            li.user-data__value.i-like {{ user.ratings_positive_total_count }}
            li.user-data__value.i-like.i_flip {{ user.ratings_negative_total_count }}
            li.user-data__value.i-less-circle {{ user.ratings_neutral_total_count }}
          //- Fix Issue #106 se integra funcionalidad para grupos
          .card__group
            .slot__group.i-star-on(
              v-if='user.group_ids.indexOf($store.getters["ui/priloverStarId"]) !== -1') Prilover <span class="txt_brand">Star</span>
            .slot__group.i-it-girl(
              v-if='user.group_ids.indexOf($store.getters["ui/itGirlId"]) !== -1') It <span class="txt_brand">girl</span>

    .section_product__footer
      Pager(
        v-model='prilovers'
        v-on:paging="loading = $event"
        :forcedParams='computedParameters'
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
      localSearchQuery: null,
      basePath: userAPI.basePath,
      prilovers: [],
      listActive: false,
      loading: true,
      listOptionsSelected: 0,
      parameters: {
        items: 12,
        'filter[with_products]': 1
      }
    }
  },
  computed: {
    listOptions () {
      return [
        { id: 0, name: 'Todas' },
        { id: this.$store.getters['ui/priloverStarId'], name: 'Prilover Star' },
        { id: this.$store.getters['ui/itGirlId'], name: 'It Girl' }
      ]
    },
    computedParameters () {
      if (!this.$route.query.q) {
        return { ...this.parameters, orderby: '-latest_product' }
      }
      return this.parameters
    },
    searchQuery: {
      get () {
        return this.localSearchQuery !== null ? this.localSearchQuery : this.$route.query.q
      },
      set (value) {
        this.localSearchQuery = value
      }
    }
  },
  methods: {
    openList () {
      this.listActive = !this.listActive
    },
    changeOrder (listOptionId) {
      const parameters = { ...this.parameters }
      this.listOptionsSelected = listOptionId
      this.listActive = false
      if (this.listOptionsSelected === 0) {
        delete parameters['filter[group_ids]']
      } else {
        parameters['filter[group_ids]'] = listOptionId
      }
      this.parameters = parameters
    },
    changeSearch () {
      const query = { ...this.$route.query }
      query.page = 1
      delete query.q
      if (this.searchQuery) {
        query.q = this.searchQuery.replace(/@/g, ' ')
      }
      this.$router.push({
        name: this.$route.name,
        params: { ...this.$route.params, keepPosition: true },
        query
      })
    }
  }
}
</script>
