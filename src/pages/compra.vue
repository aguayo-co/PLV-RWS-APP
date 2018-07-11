<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item(
          :class="{steps__item_current: isShoppingCart && !shoppingCartStep}")
          span.steps__bullet.i-ok 1
          span.steps__label Envío
          //-TO DO: Valor compra
          span.steps__value(v-if="orderTotal") ${{ orderTotal | currency }}
        li.steps__item(
          :class="{steps__item_current: isPayment || shoppingCartStep}")
          span.steps__bullet.i-ok  2
          span.steps__label Pago
        li.steps__item(
          :class="{steps__item_current: isPayed}")
          span.steps__bullet.i-ok  3
          span.steps__label Confirmación

  .layout-inner
    Loader(v-if="loading")
    //- List paso 1:compra
    .list(v-else-if="isShoppingCart")
      .compra-data_info(v-if="!Object.keys(sales).length")
        //- Alerta sin productos
        .alert-msg.alert-msg_center.alert-msg_top.i-sad En este momento no tienes items en tu carro de compras
        .single__row
          router-link.btn(:to="{ name: 'home' }") Ir al Shop
      //-grid
      .list__grid(v-else)
        //-list content
        CompraEnvioPago(
          :errors="errors"
          :hasChilexpress="hasChilexpress"
          v-bind:shoppingCartStep="shoppingCartStep"
          v-on:setShoppingCartStep="setShoppingCartStep($event)"
          v-on:validate="validate($event)"
          v-on:clearError="clearError($event)")
        //-end list content

        //-Tabla Total
        CompraDetalle(
          :errors="errors"
          v-bind:shoppingCartStep="shoppingCartStep"
          v-on:setShoppingCartStep="setShoppingCartStep($event)"
          v-on:validate="validate($event)"
          v-on:clearError="clearError($event)")
        //-End Tabla Total
      //-End grid
    //- End List paso 1:compra

    //- Paso 2: Pago
    CompraTransferencia(v-else-if="isTransfer" v-model="order")
    //- End Paso 2: Pago

    //- Paso 3: Comprobante
    CompraPago(v-else-if="isPayment || isPayed" :order="order")
    CompraCancelada(v-else-if="isCanceled" :order="order")
    //- End Paso 3: Comprobante
</template>

<script src="./js/compra.js"></script>
