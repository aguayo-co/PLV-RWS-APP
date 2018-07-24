<template lang="pug">
.layout-band
  .layout-inner
    header.page__head
      h1.title__main Tu Carrito de Compras
    ul.steps__list
      li.steps__item(
        :class="{steps__item_current: step === 1}")
        span.steps__bullet.i-ok 1
        span.steps__label Envío
        //-TO DO: Valor compra
        span.steps__value(v-if="total") ${{ total | currency }}
      li.steps__item(
        :class="{steps__item_current: step === 2}")
        span.steps__bullet.i-ok  2
        span.steps__label Pago
      li.steps__item(
        :class="{steps__item_current: step === 3}")
        span.steps__bullet.i-ok  3
        span.steps__label Confirmación
</template>

<script>
export default {
  name: 'CartStep',
  props: ['step', 'total']
}
</script>
