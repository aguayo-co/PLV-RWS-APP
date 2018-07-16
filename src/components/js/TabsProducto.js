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
      orderby: '-id',
      isActive: undefined,
      activeTab: 'published',
      pagination: null,
      products: null,
      loading: true,
      modalDeleteId: null,
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
        if (this.products.length === 0) {
          this.products = null
        }
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
        if (this.products.length === 0) {
          this.products = null
        }
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
        if (this.products.length === 0) {
          this.products = null
        }
      }).finally(() => {
        this.$delete(product, '_loading')
        this.modalDeleteId = null
      })
    },
    loadProducts () {
      this.products = null
      let filters = {}
      filters.status = this.tabs[this.activeTab].filter
      filters.user_id = this.user.id
      const currentLoader = this.loading = productAPI.getAuth(1, null, filters, this.orderby)
        .then((response) => {
          // Maybe the user exited the current tab already
          // Since a promise is not cancelable (yet) we ignore
          // a callback which is not the latest one.
          if (this.loading === currentLoader) {
            this.pagination = response.data
            this.loading = false
          }
        })
    }
  },
  created: function () {
    this.loadProducts()
  },
  watch: {
    activeTab () {
      this.tabsMobile = false
      this.loadProducts()
    },
    pagination (newPagination) {
      if (newPagination && newPagination.data.length > 0) {
        this.products = newPagination.data
        return
      }

      this.products = null
    }
  }
}
