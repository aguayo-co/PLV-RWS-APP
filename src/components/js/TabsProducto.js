import productAPI from '@/api/product'
import Pager from '@/Mixin/Pager'

export default {
  name: 'TabsProducto',
  components: {
    Pager
  },
  props: ['user'],
  data () {
    return {
      orderBy: '-id',
      isActive: undefined,
      activeTab: 'published',
      pagination: null,
      products: null,
      loading: true,
      tabs: {
        rejected: '1,3',
        published: '10,19',
        hidden: '20,29',
        sold: '30,32'
      }
    }
  },
  methods: {
    loadProducts () {
      this.loading = true
      let filters = {}
      filters.status = this.tabs[this.activeTab]
      filters.user_id = this.user.id
      productAPI.getAuth(1, null, filters, this.orderBy)
        .then((response) => {
          this.pagination = response.data
          this.loading = false
        })
    },
    paging (state) {
      this.loading = state
    }
  },
  created: function () {
    this.loadProducts()
  },
  watch: {
    activeTab () {
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
