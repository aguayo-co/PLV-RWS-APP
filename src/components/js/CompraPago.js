export default {
  name: 'CompraPago',
  props: ['order'],
  computed: {
    address () {
      return this.$getNestedObject(this.order, ['shipping_information', 'address'])
    },
    products () {
      const products = {}
      // Listado de productos con información básica de la Venta y la vendedora en cada uno.
      this.order.sales.forEach(sale => {
        sale.products.forEach(product => {
          products[product.id] = product
          products[product.id].shipping_method_name = sale.shipping_method.name
          products[product.id].user = sale.user
        })
      })
      return products
    }
  }
}
