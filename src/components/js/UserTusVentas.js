import UserVenta from '@/components/UserVenta'
import Pager from '@/Mixin/Pager'

export default {
  name: 'UserTusVentas',
  components: {
    UserVenta,
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
        'filter[status]': '20,92'
      }
      this.$axiosAuth.get('/api/sales', {params}).then(response => {
        this.pagination = response.data
      })
    },
    setSale (sale) {
      this.$set(this.sales, sale.id, sale)
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
        this.setSale(pagination.data[key])
      })
    }
  }
}
