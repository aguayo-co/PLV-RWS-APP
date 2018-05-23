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
          span.steps__label Envío
          //-TO DO: Valor compra
          span.steps__value(v-if="orderTotal") ${{ orderTotal | currency }}
        li.steps__item(
          :class="{steps__item_current: isPayment}")
          span.steps__bullet.i-ok  2
          span.steps__label Pago
        li.steps__item(
          :class="{steps__item_current: isPayed}")
          span.steps__bullet.i-ok  3
          span.steps__label Confirmación

  .layout-inner
    //- List paso 1:compra
    .list(v-if="isShoppingCart")
      //-grid
      .list__grid
        //-list content
        CompraEnvioPago(v-bind:shoppingCartStep="shoppingCartStep")
        //-end list content

        //-Tabla Total
        CompraDetalle(v-bind:shoppingCartStep="shoppingCartStep" v-on:setShoppingCartStep="shoppingCartStep = $event")
        //-End Tabla Total
      //-End grid
    //- End List paso 1:compra

    //- Paso 2: Pago
    CompraPagando(v-else-if="isPayment" v-model="order")
    //- End Paso 2: Pago

    //- Paso 3: Comprobante
    CompraPagada(v-else-if="isPayed" :order="order")
    //- End Paso 3: Comprobante
</template>

<script src="./js/compra.js"></script>
