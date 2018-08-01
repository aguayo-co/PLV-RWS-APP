import UserVenta from '@/components/UserVenta'
import Pager from '@/components/Pager'
import saleAPI from '@/api/sale'

export default {
  name: 'UserTusVentas',
  components: {
    UserVenta,
    Pager
  },
  data: () => {
    return {
      baseURL: saleAPI.baseURL,
      loading: true,
      sales: [],
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
  computed: {
    forcedParams () {
      return {
        orderby: '-id',
        'filter[status]': this.listOptions.options[this.listOptions.selected].filter
      }
    }
  },
  methods: {
    setSale (freshSale) {
      const index = this.sales.findIndex(sale => sale.id === freshSale.id)
      this.$set(this.sales, index, freshSale)
    },
    openList () {
      this.listActive = !this.listActive
    },
    changeOrder (index) {
      this.listOptions.selected = index
      this.listActive = false
    }
  }
}
