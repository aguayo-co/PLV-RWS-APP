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
      orders: {},
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
    this.loadOrders()
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
    loadOrders (page = 1) {
      const params = {
        page,
        orderby: '-id',
        'filter[status]': '20,99'
      }
      this.$axiosAuth.get('/api/orders', {params}).then(response => {
        this.pagination = response.data
      })
    },
    setOrder (order) {
      this.$set(this.orders, order.id, order)
      Object.keys(order.sales).forEach(key => {
        const sale = order.sales[key]
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
      this.orders = {}
      this.sales = {}
      Object.keys(pagination.data).forEach(key => {
        this.setOrder(pagination.data[key])
      })
    }
  }
}
