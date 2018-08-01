<template lang="pug">
.layout-page
  BannerTop
  section.section_product
    .filter-head
      h3.filter-head__title Resultados para "{{ query }}"
    GridProducto(:infinite="true", :preFilter="preFilter")
  // section.section_product
  //   .alert
  //     p.alert__txt.i-sad Lo sentimos, pero no tenemos Resultados para "{{ query }}"
</template>

<script>
import GridProducto from '@/components/GridProducto'
import BannerTop from '@/components/BannerTop'

export default {
  name: 'search',
  components: {
    GridProducto,
    BannerTop
  },
  computed: {
    query () {
      return this.$route.params.query
    },
    preFilter () {
      return {
        q: this.query ? this.query.replace(/@/g, ' ') : '',
        'filter[status]': '10,19',
        // Ordena por resultadod e búsqueda.
        orderby: null
      }
    }
  }
}
</script>
