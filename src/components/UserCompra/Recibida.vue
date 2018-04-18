<template lang="pug">
.dashboard__subitem
  .dashboard__status
    p.status.status_check.i-check Producto recibido
  .dashboard__actions(v-if="!step")
    p ¿Quieres devolver este producto a la vendedora?
    a.link_underline.link_underline_lower(
      @click.prevent="completeSale"
      href='#') Pensándolo bien, me lo quedo.
    a.btn.btn_solid.btn_block(
      @click.prevent="goToStep('return')"
      href='#') Estoy segura de devolverlo
    p (Tienes 20h 12m para devolverlo)

  .dashboard__actions(v-if="step === 'return'")
    p.dashboard__lead Selecciona los productos a devolver
    span.help(
      v-show="errorLog.to_return_ids") {{ errorLog.to_return_ids }}
    ul.dashboard__list
      li.dashboard__check(v-for="product in sale.products" :key="product.id")
        input.form__input-check(
        type="checkbox"
        name="returncheck"
        :id="sale.id + 'returncheck' + product.id"
        v-model="to_return_ids"
        :value="product.id")
        label.form__label_check.i-ok(
          :for="sale.id + 'returncheck' + product.id") {{ product.title }}
    a.link_underline.link_underline_lower(
      @click.prevent="goToStep(null)"
      href='#') Pensándolo bien, me lo quedo.
    a.btn.btn_solid.btn_block(
      @click.prevent="goToStep('reason')"
      href='#') Estoy segura de devolverlo
    p (Tienes 20h 12m para devolverlo)

  .dashboard__actions(v-if="step === 'reason'")
    p.dashboard__lead Cuéntanos los motivos de la devolución.
    span.help(
      v-show="errorLog.return_reason") {{ errorLog.return_reason }}
    ul.dashboard__list
      li.dashboard__check(v-for="(reason, index) in reasons" :key="index")
        input.form__input-radio(
          type="radio"
          name="return"
          :id="sale.id + 'returnreason' + index"
          :value="index"
          v-model="return_reason")
        label.form__label_radio(
          :for="sale.id + 'returnreason' + index") {{ reason }}

    a.btn.btn_solid.btn_block(
      @click.prevent="returnSale"
      href='#') Continuar
    a.link_underline.link_underline_lower(
      @click.prevent="goToStep(null)"
      href='#') Pensándolo bien, me lo quedo.

</template>

<script src="./js/Recibida.js"></script>
