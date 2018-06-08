import Base from './Base'
import saleReturnAPI from '@/api/saleReturn'

export default Base.merge({
  name: 'Devuelta',
  data () {
    return {
      sale_return: null
    }
  },
  created () {
    this.sale_return = this.sale.returns[0]
  },
  methods: {
    saleReturnReceived () {
      saleReturnAPI.received(this.sale_return.id).then(response => {
        this.sale_return = response.data
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    },
    saleReturnCompleted () {
      saleReturnAPI.completed(this.sale_return.id).then(response => {
        this.sale_return = response.data
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    },
    saleReturnAdminManagement () {
      saleReturnAPI.adminManagement(this.sale_return.id).then(response => {
        this.sale_return = response.data
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    }
  }
})
