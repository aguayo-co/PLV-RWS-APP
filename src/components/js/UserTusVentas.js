import UserVenta from '@/components/UserVenta'

export default {
  name: 'UserTusVentas',
  components: {
    UserVenta
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
      this.$axiosAuth.get('/api/sales?filter[status]=30,99', {params}).then(response => {
        Object.keys(response.data.data).forEach(key => {
          this.setSale(response.data.data[key])
        })
      })
    },
    setSale (sale) {
      this.$set(this.sales, sale.id, sale)
    }
  }
}
