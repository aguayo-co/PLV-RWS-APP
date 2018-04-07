export default {
  name: 'CompraPayU',
  props: ['paymentData'],
  mounted () {
    this.$nextTick(function () {
      this.$el.submit()
    })
  }
}
