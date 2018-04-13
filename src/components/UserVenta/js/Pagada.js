import Base from './Base'

export default Base.merge({
  name: 'Pagada',
  data () {
    return {
      step: null
    }
  },
  computed: {
    chileExpress () {
      return this.sale.shipping_method.slug.includes('chile') && this.sale.shipping_method.slug.includes('express')
    }
  },
  methods: {
    goToStep (step) {
      this.step = step
    }
  }
})
