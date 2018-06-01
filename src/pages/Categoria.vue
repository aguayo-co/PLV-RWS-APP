<template lang="pug">
.layout-page
  div(v-if="filter")
    BannerHero(
      v-if="banner",
      :banner="banner")
    .layout-inner(v-else)
      h1.title_section {{ queryObject.name }}
    section.section_product
      GridProducto(
        :preFilter='filter'
        :infinite='true')
  .layout-inner(v-if="queryObject === null")
    .layout_nofound
      .alert
        p.alert__txt.i-sad La URL que estás intentando acceder no existe
  ButtonSticky
</template>

<script>
import { mapState } from 'vuex'
import GridProducto from '@/components/GridProducto'
import BannerHero from '@/components/BannerHero'
import bannersAPI from '@/api/banner'
import ButtonSticky from '@/components/ButtonSticky'

export default {
  name: 'Category',
  components: {
    BannerHero,
    GridProducto,
    ButtonSticky
  },
  data () {
    return {
      banner: null
    }
  },
  computed: {
    ...mapState('ui', [
      'categories',
      'brands'
    ]),
    queryType () {
      // - Checks if query corresponds to brand or category
      return this.$route.params.type
    },
    queryParameter () {
      // - Gets the slug URL parameter
      return this.$route.params.slug
    },
    flattenedCategories () {
      // - Gets an array with all categories on the first level (no nesting)
      let flattened = []
      const categories = this.categories
      categories.forEach(first => {
        flattened.push(first)
        first.children.forEach(children => {
          flattened.push(children)
        })
      })
      return flattened
    },
    queryObject () {
      // - Gets the object associated with the query parameters
      let result = null
      if (this.queryType === 'categorias') {
        result = this.flattenedCategories.filter(x => x.slug === this.queryParameter)[0]
        return result
      }
      else if (this.queryType === 'marcas') {
        result = this.brands.filter(x => x.slug === this.queryParameter)[0]
        return result
      } else {
        return result
      }
    },
    filter () {
      if (this.queryType === 'categorias' && this.queryObject) {
        return { 'filter[category_id]': this.queryObject.id }
      }
      if (this.queryType === 'marcas' && this.queryObject) {
        return { 'filter[brand_id]': this.queryObject.id }
      }
    }
  }
}
</script>
