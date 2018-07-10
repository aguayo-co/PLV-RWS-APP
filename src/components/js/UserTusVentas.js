import UserVenta from '@/components/UserVenta'
import Pager from '@/components/Pager'

export default {
  name: 'UserTusVentas',
  components: {
    UserVenta,
    Pager
  },
  data: () => {
    return {
      loading: true,
      pagination: null,
      sales: {},
      listActive: false,
      item: null,
      listOptions: {
        selected: 0,
        options: [
          { filter: '20,92', name: 'Todas' },
          { filter: 30, name: 'Pendientes de envío' },
          { filter: 20, name: 'Pendientes de pago' }
        ]
      }
    }
  },
  created () {
    this.loadSales()
  },
  computed: {
    sortedSales () {
      var sortable = []
      Object.keys(this.sales).forEach(key => {
        sortable.push(this.sales[key])
      })

      return sortable.sort(function (a, b) {
        return b.id - a.id
      })
    }
  },
  methods: {
    loadSales () {
      const params = {
        orderby: '-id',
        'filter[status]': this.listOptions.options[this.listOptions.selected].filter
      }
      const currentLoader = this.loading = this.$axiosAuth.get('/api/sales', {params})
        .then(response => {
          // Make sure this is our latest request.
          if (currentLoader === this.loading) {
            this.pagination = response.data
          }
        })
        .finally(() => {
          if (currentLoader === this.loading) {
            this.loading = null
          }
        })
    },
    setSale (sale) {
      this.$set(this.sales, sale.id, sale)
    },
    openList () {
      this.listActive = !this.listActive
    },
    changeOrder (index) {
      this.listOptions.selected = index
      this.listActive = false
      this.loadSales()
    }
  },
  watch: {
    pagination (pagination, oldPagination) {
      this.sales = {}
      Object.keys(pagination.data).forEach(key => {
        this.setSale(pagination.data[key])
      })
    }
  }
}
