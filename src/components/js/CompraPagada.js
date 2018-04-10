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
      const products = {}
      Object.keys(this.sales).forEach((key) => {
        const sale = this.sales[key]
        Object.keys(sale.products).forEach((key) => {
          const product = sale.products[key]
          products[product.id] = {
            ...product,
            shipping_method_name: sale.shipping_method.name,
            user_phone: sale.user_phone,
            user_full_name: this.user_full_name(sale.id)
          }
        })
      })
      return products
    }
  }
}
