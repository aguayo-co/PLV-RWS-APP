<template lang="pug">
.layout-page
  p.preload(v-if='loading')
    span.preload__spin.preload__spin_1
    span.preload__spin.preload__spin_2
    span.preload__spin.preload__spin_3
    span.preload__spin.preload__spin_4
  div(v-if="matchSlug && !loading")
    BannerHero(
      v-if="banner",
      :banner="banner")
    .layout-inner(v-else)
      h1.title_section {{ queryObject.name }}
    section.section_product
      GridProducto(
        :preFilter='filter'
        :infinite='true')
  .layout-inner(v-if="!matchSlug && !loading")
    .layout_nofound
      .alert
        p.alert__txt.i-sad La URL que estás intentando acceder no existe

</template>

<script>
import GridProducto from '@/components/GridProducto'
import BannerHero from '@/components/BannerHero'
import bannersAPI from '@/api/banner'
import brandsAPI from '@/api/brand'
import categoriesAPI from '@/api/category'

export default {
  name: 'Category',
  components: {
    BannerHero,
    GridProducto
  },
  data () {
    return {
      banner: null,
      loading: true,
      matchSlug: false,
      queryParameter: null,
      queryType: null,
      queryObject: {},
      filter: {}
    }
  },
  created: function () {
    this.queryType = this.$route.params.type
    this.queryParameter = this.$route.params.slug

    if (this.queryType === 'shop') {
      categoriesAPI.getCategoryBySlug(this.queryParameter)
        .then(response => {
          this.loading = false
          if (response.data.total > 0) {
            this.matchSlug = true
            this.filter = { 'category_id': response.data.data[0].id }
            this.queryObject = response.data.data[0]
            bannersAPI.getBannerBySlug('categoria-' + this.queryParameter)
              .then(response => {
                this.banner = response.data.data[0]
              })
          }
        })
    }

    if (this.queryType === 'marcas') {
      brandsAPI.getBrandBySlug(this.queryParameter)
        .then(response => {
          this.loading = false
          if (response.data.total > 0) {
            this.matchSlug = true
            this.filter = { 'brand_id': response.data.data[0].id }
            this.queryObject = response.data.data[0]
            bannersAPI.getBannerBySlug('marca-' + this.queryParameter)
              .then(response => {
                this.banner = response.data.data[0]
              })
          }
        })
    }
  }
}
</script>
