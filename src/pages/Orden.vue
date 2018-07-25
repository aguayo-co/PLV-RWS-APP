<template lang="pug">
.layout-page
  CartStep(:step="3" :total="order ? order.due : null")
  .layout-inner
    Loader(v-if="loading")
    //- Paso 2: Pago
    CompraTransferencia(v-else-if="isInPayment && isTransfer" v-model="order")
    //- End Paso 2: Pago

    //- Paso 3: Comprobante
    CompraPago(v-else-if="isInPayment || isPayed" :order="order")
    CompraCancelada(v-else-if="isCanceled" :order="order")
    //- End Paso 3: Comprobante
</template>

<script src="./js/Orden.js"></script>
