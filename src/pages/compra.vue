<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item(
          :class="{steps__item_current: isShoppingCart}")
          span.steps__bullet.i-ok 1
          span.steps__label Carro y Envío
          //-TO DO: Valor compra
          span.steps__value $65.000
        li.steps__item(
          :class="{steps__item_current: isPayment}")
          span.steps__bullet.i-ok  2
          span.steps__label Pago
        li.steps__item(
          :class="{steps__item_current: isPayed}")
          span.steps__bullet.i-ok  3
          span.steps__label Comprobante

  .layout-inner
    // List paso 1:compra y 2:envío y pago
    .list(v-if="isShoppingCart")
      //-grid
      .list__grid
        //-list content
        CompraEnvioPago
        //-end list content

        //-Tabla Total
        CompraDetalle
        //-End Tabla Total
      //-End grid
    //End List paso 1:compra y 2:envío y pago

    //Paso 3: Comprobante
    CompraPagada(v-if="isPayed")
    //End Paso 3: Comprobante

    CompraPagando(v-if="isPayment")
</template>

<script src="./js/compra.js"></script>
