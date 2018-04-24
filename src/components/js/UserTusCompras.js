import UserCompra from '@/components/UserCompra'
import FilterUser from '@/components/FilterUser'

export default {
  name: 'UserTusCompras',
  components: {
    UserCompra,
    FilterUser
  },
  data: () => {
    return {
      sales: {},
      orders: {}
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
        orderby: '-id'
      }
      this.$axiosAuth.get('/api/orders?filter[status]=30,99', {params}).then(response => {
        Object.keys(response.data.data).forEach(key => {
          this.setOrder(response.data.data[key])
        })
      })
    },
    setOrder (order) {
      this.$set(this.orders, order.id, order)
      Object.keys(order.sales).forEach(key => {
        const sale = order.sales[key]
        sale.user = order.sales[key].products[0].user
        this.$set(this.sales, sale.id, sale)
      })
    }
  }
}
