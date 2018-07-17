<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Favoritos
    .product-grid_small
      GridProducto(
        v-if='hasFavorites'
        :preFilter="this.filters",
        :infinite="false",
        :pager='true',
        :compact='true')
      template No tienes favoritos

</template>

<script>
import { mapState } from 'vuex'
import GridProducto from '@/components/GridProducto'

export default {
  name: 'UserFavoritos',
  components: {
    GridProducto
  },
  computed: {
    ...mapState('user', ['favorites_ids']),
    hasFavorites () {
      return this.favorites_ids && this.favorites_ids.length
    },
    filters () {
      let filters = {
        'filter[id]': this.favorites_ids.join(',')
      }
      return filters
    }
  }
}
</script>
