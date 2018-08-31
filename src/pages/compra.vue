<template lang="pug">
.layout-page
  CartStep(:step="step ? 2 : 1" :total="due")
  .layout-inner
    Loader(v-if="loading")
    //- List paso 1:compra
    .list(v-else)
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
          :step="step"
          @isProcessing="isProcessing"
          @setStep="setStep"
          @validate="validate"
          @clearError="clearError")
        //-end list content

        //-Tabla Total
        CompraDetalle(
          :errors="errors"
          :step="step"
          :processing="processing.length > 0"
          @isProcessing="isProcessing"
          @setStep="setStep"
          @validate="validate"
          @clearError="clearError")
        //-End Tabla Total
      //-End grid
    //- End List paso 1:compra
</template>

<script src="./js/compra.js"></script>
