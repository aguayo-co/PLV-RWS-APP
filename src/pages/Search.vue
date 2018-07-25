<template lang="pug">
.layout-page
  BannerTop
  section.section_product(v-show='loading')
    p.preload
      span.preload__spin.preload__spin_1
      span.preload__spin.preload__spin_2
      span.preload__spin.preload__spin_3
      span.preload__spin.preload__spin_4
  section.section_product(v-show="hasResults && !loading")
    .filter-head
      h3.filter-head__title {{ results }} Resultados para "{{ query }}"
    GridProducto(v-if="preFilter", :infinite="true", :preFilter="preFilter", @doneResults="doneResults")
  section.section_product(v-show="!hasResults")
    .alert
      p.alert__txt.i-sad Lo sentimos, pero no tenemos Resultados para "{{ query }}"
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
  data () {
    return {
      loading: true,
      hasResults: true,
      results: 0
    }
  },
  watch: {
    return () {
      this.loading = true
    }
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
  },
  methods: {
    doneResults: function (total) {
      if (total > 0) {
        this.hasResults = true
      } else {
        this.hasResults = false
      }
      this.loading = false
      this.results = total
    }
  }
}
</script>
