<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Favoritos
    .product-grid_small
      GridProducto(
      :preFilter="this.filters",
      :infinite="false",
      :pager='true',
      :compact='true')

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
    ...mapState(['user']),
    filters () {
      let filters = {}
      filters.id = this.user.favorites_ids.join(',')
      return filters
    }
  }
}
</script>
