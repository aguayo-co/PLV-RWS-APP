import productAPI from '@/api/product'
import Pager from '@/components/Pager'

export default {
  name: 'TabsProducto',
  components: {
    Pager
  },
  props: ['user'],
  data () {
    return {
      basePath: productAPI.basePath,
      orderby: '-id',
      isActive: undefined,
      activeTab: 'published',
      products: [],
      loading: true,
      modalDeleteId: null,
      forcedParams: null,
      tabs: {
        published: {title: 'Publicados', filter: '10,19'},
        sold: {title: 'Vendidos', filter: '30,32'},
        hidden: {title: 'Ocultos', filter: '20,29'},
        rejected: {title: 'Rechazados', filter: '1,2'},
        pending: {title: 'Pendientes', filter: '0,3'}
      },
      tabsMobile: false
    }
  },
  methods: {
    hideProduct (product) {
      const data = {
        id: product.id,
        status: 20
      }
      this.$set(product, '_loading', true)
      productAPI.update(data).then(() => {
        const index = this.products.indexOf(product)
        this.$delete(this.products, index)
      }).finally(() => {
        this.$delete(product, '_loading')
      })
    },
    unHideProduct (product) {
      const data = {
        id: product.id,
        status: 19
      }
      this.$set(product, '_loading', true)
      productAPI.update(data).then(() => {
        const index = this.products.indexOf(product)
        this.$delete(this.products, index)
      }).finally(() => {
        this.$delete(product, '_loading')
      })
    },
    confirmAlert (id) {
      this.modalDeleteId = id
    },
    deleteProduct (product) {
      this.$set(product, '_loading', true)
      productAPI.delete(product).then(() => {
        const index = this.products.indexOf(product)
        this.$delete(this.products, index)
      }).finally(() => {
        this.$delete(product, '_loading')
        this.modalDeleteId = null
      })
    },
    setParams (forceChange = false) {
      const forcedParams = {}
      forcedParams['filter[status]'] = this.tabs[this.activeTab].filter
      forcedParams['filter[user_id]'] = this.user.id
      forcedParams['orderby'] = this.orderby
      if (forceChange) {
        forcedParams['timestamp'] = this.$moment.now()
      }
      this.forcedParams = forcedParams
    }
  },
  created () {
    this.setParams()
  },
  watch: {
    'user.vacation_mode' () {
      this.setParams(true)
    },
    activeTab () {
      this.tabsMobile = false
      this.setParams()
    }
  }
}
