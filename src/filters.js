export default {
  install (Vue) {
    Vue.filter('currency', function (value) {
      if (!isNaN(value)) return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
    })
    Vue.filter('date', function (value) {
      return value ? Vue.moment(value).format('LL') : ''
    })
    Vue.filter('discount', function (product) {
      if (!product || !product.price) {
        return 0
      }
      return (product.price - product.sale_price) * 100 / product.price
    })
    Vue.filter('address', function (address) {
      if (!address) {
        return ''
      }
      return address.street + ' ' + address.number + ' ' + (address.additional || '') + ' - ' + address.commune + ', ' + address.province + ', ' + address.region
    })
    Vue.filter('full_name', function (user) {
      return user.first_name + ' ' + user.last_name
    })
    Vue.filter('product_status', function (value) {
      switch (value) {
        case 0:
        case 3:
          return 'Pendiente de aprobación'
        case 1:
          return 'Rechazado'
        case 10:
          return 'Aprobado'
        case 19:
          return 'Disponible'
        case 30:
          return 'Vendido'
        default:
          return 'Deshabilitado'
      }
    })
  }
}
