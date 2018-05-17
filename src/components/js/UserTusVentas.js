import UserVenta from '@/components/UserVenta'

export default {
  name: 'UserTusVentas',
  components: {
    UserVenta
  },
  data: () => {
    return {
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
        orderby: '-id',
        'filter[status]': '20,99'
      }
      this.$axiosAuth.get('/api/sales', {params}).then(response => {
        Object.keys(response.data.data).forEach(key => {
          this.setSale(response.data.data[key])
        })
      })
    },
    setSale (sale) {
      this.$set(this.sales, sale.id, sale)
    },
    openList: function () {
      this.listActive = !this.listActive
    },
    changeOrder: function (listOptionId) {
      this.listOptions.selected = listOptionId
      this.listActive = false
    }
  }
}
