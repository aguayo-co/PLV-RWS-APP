export default {
  name: 'CompraCancelada',
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
