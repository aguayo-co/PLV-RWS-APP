import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CompraPagada',
  computed: {
    couponValid () {
      return this.coupon_code && this.newOrderData.coupon_code === null
    },
    ...mapGetters('cart', [
      'user_full_name'
    ]),
    ...mapState('cart', [
      'sales',
      'address'
    ]),
    products () {
      const vm = this
      const products = {}
      Object.keys(vm.sales).forEach((key) => {
        const sale = vm.sales[key]
        Object.keys(sale.products).forEach((key) => {
          const product = sale.products[key]
          products[product.id] = {
            ...product,
            shipping_method_name: sale.shipping_method.name,
            user_phone: sale.user_phone,
            user_full_name: vm.user_full_name(sale.id)
          }
        })
      })
      return products
    }
  }
}
