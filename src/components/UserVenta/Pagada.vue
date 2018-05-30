<template lang="pug">
.dashboard__subitem(v-if="!sale.is_chilexpress")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Producto pagado
    p.status.status_alert.i-alert-circle Pendiente de entrega acordada con compradora
  .dashboard__actions(v-if="!step")
    p ¿Ya lo enviaste o entregaste?
    a.btn.btn_solid.btn_block(
        @click.prevent="goToStep('delivered')"
        href="#") Sí, ya lo envié o entregué.
    router-link.link_underline(
      :to="{ name: 'privateMessage', params: { recipientId: sale.order.user_id }}") Escribir a la compradora

  .dashboard__actions(v-if="step === 'delivered'")
    p ¿Cómo entregaste este producto?
    span.dashboard__actions_link
      a.link_underline(
        @click.prevent="saleDelivered"
        href="#") Nos juntamos
    a.link_underline(
        @click.prevent="goToStep('shipped')"
        href="#") Usé una empresa de trasporte

  .dashboard__actions(v-if="step === 'shipped'")
    form.form.dashboard__form(
      @submit.prevent="saleShipped")
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
        button.btn.btn_solid Enviar número de seguimiento

.dashboard__subitem(v-else)
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_check.i-check Producto pagado
    p.status.status_alert.i-alert-circle Pendiente de envío con Chilexpress
  .dashboard__actions(v-if="!step")
    p ¿Ya imprimiste la etiqueta y enviaste el producto?
    a.btn.btn_solid.btn_block(
      @click.prevent="goToStep('shipped')"
      href="#") Si, ya lo envié.
    a.link_underline(
      target="_blank"
      :href="sale.shipping_label") Reimprimir etiqueta de Chilexpress

  .dashboard__actions(v-if="step === 'shipped'")
    form.form.dashboard__form(
      v-on:submit='',
      action='#',
      method='post')
      .form__row
        label.form__label(
          for='numTracing') Ingresa el Nº de seguimiento de Chilexpress
        input.form__control(
          id='numTracing',
          type='text'
        )
      .form__row
        button.btn.btn_solid Enviar número de seguimiento

</template>

<script src="./js/Pagada.js"></script>
