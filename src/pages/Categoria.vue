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
  Loader(v-if="loading")
  .layout-inner(v-else-if="queryObject === null")
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
import campaignsAPI from '@/api/campaigns'
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
      loading: true,
      banner: null,
      campaign: null
    }
  },
  computed: {
    ...mapState('ui', [
      'categories',
      'brands'
    ]),
    queryObject () {
      if (this.queryType === 'categorias') {
        const category = this.flattenedCategories.filter(x => x.slug === this.slug)[0]
        this.loadBannerCategory()
        return category
      }

      if (this.queryType === 'marcas') {
        const brand = this.brands.filter(x => x.slug === this.slug)[0]
        this.loadBannerBrand()
        return brand
      }

      if (this.queryType === 'campanas') {
        return this.campaign
      }
    },
    queryType () {
      // - Checks if query corresponds to brand or category
      return this.$route.params.type
    },
    slug () {
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
    filter () {
      if (this.queryType === 'categorias' && this.queryObject) {
        return { 'filter[category_id]': this.queryObject.id }
      }

      if (this.queryType === 'marcas' && this.queryObject) {
        return { 'filter[brand_id]': this.queryObject.id }
      }

      if (this.queryType === 'campanas' && this.queryObject) {
        return { 'filter[campaign_ids]': this.queryObject.id }
      }
    }
  },
  methods: {
    loadCampaign () {
      this.campaign = null
      if (this.queryType !== 'campanas') {
        return
      }

      this.loading = true
      campaignsAPI.getBySlug(this.slug)
        .then(response => {
          this.campaign = response.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    loadBannerCategory () {
      bannersAPI.getBannerBySlug('categoria-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
    },
    loadBannerBrand () {
      bannersAPI.getBannerBySlug('marca-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
    }
  },
  created () {
    if (this.queryType !== 'campanas') {
      this.loading = false
      return
    }

    this.loadCampaign()
  },
  watch: {
    queryType () {
      if (this.queryType !== 'campanas') {
        this.loading = false
        return
      }

      this.loadCampaign()
    }
  }
}
</script>
