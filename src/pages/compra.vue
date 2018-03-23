<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item.steps__item_current
          span.steps__bullet.i-ok 1
          span.steps__label Carro
          //-TO DO: Valor compra
          span.steps__value $65.000
        li.steps__item
          span.steps__bullet.i-ok  2
          span.steps__label Envío y pago
        li.steps__item
          span.steps__bullet.i-ok  3
          span.steps__label Comprobante
</template>

<script>
export default {
  name: 'Compra'
}
</script>
