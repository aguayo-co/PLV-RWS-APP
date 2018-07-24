<template lang="pug">
.layout-page
  div(v-if="filter")
    BannerHero(
      v-if="banner",
      :banner="banner")
    .layout-inner(v-else)
      h1.title_section(v-html="queryObject ? queryObject.name : 'Recién llegados'")
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
  name: 'ProductosFiltrado',
  components: {
    BannerHero,
    GridProducto,
    ButtonSticky
  },
  props: ['type', 'slug'],
  data () {
    return {
      loading: true,
      banner: null,
      campaign: null,
      baseFilter: {
        'filter[status]': '10,19'
      }
    }
  },
  computed: {
    ...mapState('ui', [
      'categories',
      'brands'
    ]),
    queryObject () {
      if (this.type === 'categorias') {
        const category = this.flattenedCategories.find(x => x.slug === this.slug)
        this.loadBannerCategory()
        return category
      }

      if (this.type === 'marcas') {
        const brand = this.brands.find(x => x.slug === this.slug)
        this.loadBannerBrand()
        return brand
      }

      if (this.type === 'campanas') {
        this.loadBannerCampaign()
        return this.campaign
      }
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
      if (this.type === 'categorias' && this.queryObject) {
        return { ...this.baseFilter, 'filter[category_id]': this.queryObject.id }
      }

      if (this.type === 'marcas' && this.queryObject) {
        return { ...this.baseFilter, 'filter[brand_id]': this.queryObject.id }
      }

      if (this.type === 'campanas' && this.queryObject) {
        return { ...this.baseFilter, 'filter[campaign_ids]': this.queryObject.id }
      }

      if (this.type === undefined) {
        return {}
      }
    }
  },
  methods: {
    loadCampaign () {
      this.campaign = null
      if (this.type !== 'campanas') {
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
    loadBannerCampaign () {
      bannersAPI.getBannerBySlug('campana-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
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
    if (this.type !== 'campanas') {
      this.loading = false
      return
    }

    this.loadCampaign()
  },
  watch: {
    type () {
      if (this.type !== 'campanas') {
        this.loading = false
        return
      }

      this.loadCampaign()
    }
  }
}
</script>
