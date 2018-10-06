import { mapState } from 'vuex'
import FilterPrecio from '@/components/FilterPrecio'

const filterFields = {
  category_id: null,
  size_id: null,
  brand_id: null,
  color_ids: null,
  condition_id: null,
  region_id: null,
  price: null
}
export default {
  name: 'FilterDesk',
  props: [
    'filter',
    'extraOrderOptions'
  ],
  components: {
    FilterPrecio
  },
  computed: {
    selectedOrderOption () {
      return this.orderOptions.find(option => option.param === this.orderby)
    },
    orderOptions () {
      if (this.extraOrderOptions) {
        return this.localOrderOptions.concat(this.extraOrderOptions)
      }
      return this.localOrderOptions
    },
    ...mapState('ui', [
      'conditions',
      'categories',
      'colors',
      'brands',
      'sizes',
      'regions'
    ])
  },
  data () {
    return {
      filterFields,
      localOrderOptions: [
        { name: 'Lo último', param: '-created_at' },
        { name: 'Menor precio', param: 'price' },
        { name: 'Mayor precio', param: '-price' },
        { name: 'Destacados', param: '-prilov' },
        { name: 'Nuestros favoritos', param: 'favorites' }
      ],
      precio: {
        value: [
          '0',
          '150000'
        ],
        width: '100%',
        height: 1,
        min: 0,
        max: 150000,
        interval: 5000,
        piecewise: true,
        formatter: '$ {value}',
        tooltip: 'false',
        piecewiseStyle: {
          'visibility': 'hidden'
        },
        bgStyle: {
          'backgroundColor': '#000'
        },
        processStyle: {
          'backgroundColor': '#fe7676'
        },
        sliderStyle: {
          'boxShadow': 'none',
          'border': '1px solid #000'
        }
      },
      new_filter: {
        category_id: [],
        size_id: [],
        brand_id: [],
        color_ids: [],
        condition_id: [],
        region_id: []
      },
      orderby: null
    }
  },
  watch: {
    filter () {
      this.setPreFilter()
      this.readQuery()
    },
    '$route.path' () {
      this.setPreFilter()
      this.readQuery()
    },
    '$route.query' () {
      this.setPreFilter()
      this.readQuery()
    }
  },
  created () {
    this.setPreFilter()
    this.readQuery()
  },
  methods: {
    filterChange () {
      if (this.precio.value[1] === 150000) {
        this.new_filter.price = this.precio.value[0] + ',500000'
      } else {
        this.new_filter.price = this.precio.value[0] + ',' + this.precio.value[1]
      }
      this.applyFilters()
    },
    setPreFilter () {
      this.$router.replace({
        params: this.$route.params,
        query: { ...this.filter, ...this.$route.query }
      })
    },
    readQuery () {
      this.orderby = this.$route.query.orderby
      Object.keys(this.filterFields).forEach(filter => {
        const value = this.$route.query['filter[' + filter + ']']
        switch (filter) {
          case 'price':
            const price = value ? value.split(',') : [this.precio.min, this.precio.max]
            this.precio.value = [
              Math.max(this.precio.min, price[0]),
              Math.min(this.precio.max, price[1])
            ]
            break

          default:
            this.new_filter[filter] = value ? value.split(',') : []
        }
      })
    },
    setQuery (parameters) {
      const query = { ...this.$route.query, ...parameters }
      query.page = 1
      Object.keys(query).forEach(param => {
        if (parameters[param] === '' || parameters[param] === undefined || parameters[param] === null) {
          delete query[param]
          delete parameters[param]
        }
      })
      this.$router.push({
        name: this.$route.name,
        params: { ...this.$route.params, keepPosition: true },
        query
      })
    },
    applyFilters () {
      const filters = {}
      Object.keys(this.filterFields).forEach(key => {
        switch (key) {
          case 'price':
            filters['filter[price]'] = this.new_filter.price || ''
            break

          default:
            filters['filter[' + key + ']'] = this.new_filter[key].join(',') || ''
        }
      })
      filters.orderby = this.orderby
      this.setQuery(filters)
    },
    changeOrder (orderOption) {
      this.orderby = orderOption.param
      this.applyFilters()
    }
  }
}
