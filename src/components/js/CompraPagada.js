export default {
  name: 'CompraPagada',
  props: ['order'],
  computed: {
    couponValid () {
      return this.coupon_code && this.newOrderData.coupon_code === null
    },
    address () {
      return this.$getNestedObject(this.order, ['shipping_information', 'address'])
    },
    paymentStatus () {
      return this.$getNestedObject(this.order, ['payments', 0, 'status'])
    },
    products () {
      const products = {}
      // Listado de productos con información básica de la Venta y la vendedora en cada uno.
      this.order.sales.forEach(sale => {
        sale.products.forEach(product => {
          products[product.id] = {
            ...product,
            shipping_method_name: sale.shipping_method.name
          }
        })
      })
      return products
    }
  }
}
