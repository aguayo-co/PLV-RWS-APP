import UserCompra from '@/components/UserCompra'

export default {
  name: 'UserTusCompras',
  components: {
    UserCompra
  },
  data: () => {
    return {
      sales: {}
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
    loadSales (page = 1) {
      const params = {
        page,
        orderby: '-id'
      }
      this.$axiosAuth.get('/api/orders', {params}).then(response => {
        Object.keys(response.data.data).forEach(key => {
          const order = response.data.data[key]
          Object.keys(order.sales).forEach(key => {
            const sale = order.sales[key]
            sale.user = order.sales[key].products[0].user
            this.$set(this.sales, sale.id, sale)
          })
        })
      })
    }
  }
}
