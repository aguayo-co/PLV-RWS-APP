import UserCompra from '@/components/UserCompra'
import Pager from '@/Mixin/Pager'

export default {
  name: 'UserTusCompras',
  components: {
    UserCompra,
    Pager
  },
  data: () => {
    return {
      pagination: null,
      sales: {},
      listActive: false,
      item: null,
      listOptions: {
        selected: 0,
        options: [
          { id: 0, name: 'Todas' },
          { id: 1, name: 'Pendientes de envío' },
          { id: 2, name: 'Pendientes de pago' }
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
    loadSales (page = 1) {
      const params = {
        page,
        buyer: true,
        orderby: '-id',
        'filter[status]': '20,99'
      }
      this.$axiosAuth.get('/api/sales', {params}).then(response => {
        this.pagination = response.data
      })
    },
    refreshOrder (order) {
      const sales = order.sales
      delete order.sales
      Object.keys(sales).forEach(key => {
        const sale = sales[key]
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
    changeOrder (listOptionId) {
      this.listOptions.selected = listOptionId
      this.listActive = false
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
