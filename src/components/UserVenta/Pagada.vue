<template lang="pug">
.dashboard__subitem(v-if="!sale.is_chilexpress")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Producto pagado
    p.status.status_alert.i-alert-circle Pendiente de entrega acordada con compradora
  .dashboard__actions(v-if="!step")
    p ¿Ya lo enviaste o entregaste?
    a.btn.btn_solid.btn_block(
      :disabled='processing'
      @click.prevent="goToStep('delivered')") Sí, ya lo envié o entregué.
    router-link.link_underline(
      :to="{ name: 'privateMessage', params: { recipientId: sale.order.user_id }}") Escribir a la compradora

  .dashboard__actions(v-if="step === 'delivered'")
    p ¿Cómo entregaste este producto?
    span.dashboard__actions_link
      a.link_underline(
        :disabled='processing'
        @click.prevent="saleDelivered") Nos juntamos
    span.dashboard__actions_link
      a.link_underline(
        :disabled='processing'
        @click.prevent="goToStep('shipped')") Usé una empresa de trasporte

  .dashboard__actions(v-if="step === 'shipped'")
    form.form.dashboard__form(
      @submit.prevent="saleShippedAgreed")
      .form__row
        label.form__label(
          for='getName') Ingresa el nombre de la empresa de mensajería
        span.help(
          v-show="errorLog.shipping_company") {{ errorLog.shipping_company }}
        input.form__control(
          v-model="shipping_company",
          id='getName',
          type='text'
        )
      .form__row
        label.form__label(
          for='getNumber') Ingresa el número de seguimiento.
        span.help(
          v-show="errorLog.tracking_code") {{ errorLog.tracking_code }}
        input.form__control(
          v-model="tracking_code",
          id='getNumber',
          type='text'
        )
      .form__row
        button.btn.btn_solid(
          :disabled='processing') Enviar número de seguimiento

.dashboard__subitem(v-else)
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Producto pagado
    p.status.status_alert.i-alert-circle Pendiente de envío con Chilexpress
  .dashboard__actions
    p ¿Ya imprimiste la etiqueta y enviaste el producto?
    a.btn.btn_solid.btn_block(
      :disabled='processing'
      @click.prevent="saleShippedChilexpress") Sí, ya lo envié.
    a.link_underline(
      v-if="sale.shipping_label"
      target="_blank"
      :href="sale.shipping_label") Imprimir etiqueta de Chilexpress
    span(
      v-else) Chilexpress está generando la etiqueta para esta venta. Por favor consulta más tarde.
</template>

<script src="./js/Pagada.js"></script>
