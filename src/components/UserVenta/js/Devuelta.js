import Base from './Base'
import saleReturnAPI from '@/api/saleReturn'

export default {
  name: 'Devuelta',
  mixins: [Base],
  data () {
    return {
      sale_return: null
    }
  },
  created () {
    this.sale_return = this.sale.returns[0]
  },
  methods: {
    saleReturnCompleted () {
      saleReturnAPI.completed(this.sale_return.id).then(response => {
        this.sale_return = response.data
      }).catch((e) => {
        this.$handleApiErrors(e)
      })
    }
  }
}
