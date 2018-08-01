import UserCompra from '@/components/UserCompra'
import Pager from '@/components/Pager'
import saleAPI from '@/api/sale'

export default {
  name: 'UserTusCompras',
  components: {
    UserCompra,
    Pager
  },
  data: () => {
    return {
      basePath: saleAPI.basePath,
      loading: true,
      sales: [],
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
  computed: {
    totalProducts () {
      return this.$store.getters['cart/products']
    },
    forcedParams () {
      return {
        buyer: true,
        orderby: '-id',
        'filter[status]': this.listOptions.options[this.listOptions.selected].filter
      }
    }
  },
  methods: {
    refreshOrder (order) {
      const sales = order.sales
      delete order.sales
      sales.forEach(newSale => {
        const index = this.sales.findIndex(oldSale => oldSale.id === newSale.id)
        if (index === -1) {
          return
        }
        this.$set(newSale, 'order', order)
        this.$set(this.sales, index, newSale)
      })
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
