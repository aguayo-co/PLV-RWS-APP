<template lang="pug">
.dashboard__subitem
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_check.i-check Compra recibida
  .dashboard__actions(v-if="!step")
    p ¿Estás segura de hacer una devolución?
    a.btn.btn_solid.btn_block(
      :disabled='processing'
      @click.prevent="goToStep('return')") Sí, quiero hacer una devolución
    a.link_underline.link_underline_lower(
      :disabled='processing'
      @click.prevent="completeSale") Pensándolo bien, no quiero devolver
    p * Si compraste más de un producto, en el siguiente paso podrás decidir cuáles quieres devolver.

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
    a.btn.btn_solid.btn_block(
      :disabled='processing'
      @click.prevent="goToStep('reason')") Devolver
    a.link_underline.link_underline_lower(
      :disabled='processing'
      @click.prevent="goToStep(null)") Pensándolo bien, no quiero devolver

  .dashboard__actions(v-if="step === 'reason'")
    p.dashboard__lead Cuéntanos los motivos de la devolución
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
      :disabled='processing'
      @click.prevent="returnSale") Confirmar devolución
    a.link_underline.link_underline_lower(
      :disabled='processing'
      @click.prevent="goToStep(null)") Pensándolo bien, no quiero devolver

</template>

<script src="./js/Recibida.js"></script>
