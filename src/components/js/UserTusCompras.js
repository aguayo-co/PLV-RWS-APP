import UserCompra from '@/components/UserCompra'
import Pager from '@/components/Pager'

export default {
  name: 'UserTusCompras',
  components: {
    UserCompra,
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
          { filter: '20,99', name: 'Todas' },
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
    totalProducts () {
      return this.$store.getters['cart/products']
    },
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
        buyer: true,
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
    refreshOrder (order) {
      const sales = order.sales
      delete order.sales
      sales.forEach(sale => {
        if (!this.sales[sale.id]) {
          return
        }
        this.$set(sale, 'order', order)
        this.$set(this.sales, sale.id, sale)
      })
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
        const sale = pagination.data[key]
        this.$set(this.sales, sale.id, sale)
      })
    }
  }
}
