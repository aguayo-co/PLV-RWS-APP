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
  ButtonSticky
</template>

<script>
import { mapState } from 'vuex'
import GridProducto from '@/components/GridProducto'
import BannerHero from '@/components/BannerHero'
import bannersAPI from '@/api/banner'
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
      banner: null,
      baseFilter: {
        'filter[status]': '10,19'
      }
    }
  },
  computed: {
    ...mapState('ui', [
      'categories',
      'brands',
      'campaigns',
      'groups'
    ]),
    queryObject () {
      if (this.type === 'categorias') {
        const category = this.flattenedCategories.find(x => x.slug === this.slug)
        if (!category && this.flattenedCategories.length) {
          this.$notFound()
        }
        this.loadBannerCategory()
        return category
      }

      if (this.type === 'marcas') {
        const brand = this.brands.find(x => x.slug === this.slug)
        if (!brand && this.brands.length) {
          this.$notFound()
        }
        this.loadBannerBrand()
        return brand
      }

      if (this.type === 'campanas') {
        const campaign = this.campaigns.find(x => x.slug === this.slug)
        if (!campaign && this.campaigns.length) {
          this.$notFound()
        }
        this.loadBannerCampaign()
        return campaign
      }

      if (this.type === 'grupo') {
        const group = this.groups.find(x => x.slug === this.slug)
        if (!group && this.groups.length) {
          this.$notFound()
        }
        this.loadBannerGroup()
        return group
      }
      // Not a valid type.
      if (this.type) {
        this.$notFound()
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
      if (this.queryObject) {
        if (this.type === 'categorias') {
          return { ...this.baseFilter, 'filter[category_id]': this.queryObject.id }
        }

        if (this.type === 'marcas') {
          return { ...this.baseFilter, 'filter[brand_id]': this.queryObject.id }
        }

        if (this.type === 'campanas') {
          return { ...this.baseFilter, 'filter[campaign_ids]': this.queryObject.id }
        }

        if (this.type === 'grupo') {
          return { ...this.baseFilter, 'filter[users_groups_ids]': this.queryObject.id }
        }
      }
    }
  },
  methods: {
    loadBannerGroup () {
      bannersAPI.getBySlug('group-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
    },
    loadBannerCampaign () {
      bannersAPI.getBySlug('campana-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
    },
    loadBannerCategory () {
      bannersAPI.getBySlug('categoria-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
    },
    loadBannerBrand () {
      bannersAPI.getBySlug('marca-' + this.slug)
        .then(response => {
          this.banner = response.data
        }).catch(() => {})
    }
  }
}
</script>
