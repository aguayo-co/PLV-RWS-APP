<template lang="pug">
//- La compradora no ha enviado le producto de vuelta.
.dashboard__subitem(v-if="sale_return.status === 0")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_warning.i-reload <strong>Devolución:&nbsp;</strong> estamos esperando a que envíes de vuelta
  .dashboard__actions
    p Tienes 4 días y 23 horas para que la vendedora reciba de vuelta. De lo contrario la devolución se cancelará automáticamente.
    form.form.dashboard__form(
      @submit.prevent="saleReturnShipped")
      .form__row
        label.form__label(
          for='getName') Ingresa el nombre de la empresa de mensajería
        span.help(
          v-show="errorLog.shipping_company") {{ errorLog.shipping_company }}
        input.form__control(
          id='getName',
          type='text',
          v-model="shipping_company"
        )
      .form__row
        label.form__label(
          for='getNumber') Ingresa el número de seguimiento
        span.help(
          v-show="errorLog.tracking_code") {{ errorLog.tracking_code }}
        input.form__control(
          id='getNumber',
          type='text'
          v-model="tracking_code"
        )
      .form__row
        button.btn.btn_solid Enviar número de seguimiento
    .break
      span.break__txt O
    a.link_underline(
      @click.prevent="saleReturnDelivered"
      href='#') Acordé juntarme con la vendedora

//- La compradora marcó la devolución cómo enviada.
.dashboard__subitem(v-else-if="sale_return.status === 40")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_warning.i-reload <strong>Devolución:&nbsp;</strong> de la vendedora
  .dashboard__actions
    p Ya nos informaste que devolviste el pedido:
    p Empresa:
      span  {{ shipping_company }}
    p Número de Seguimiento:
      span  {{ tracking_code }}
    p Estamos esperando que la vendedora nos confirme que recibió la devolución.
    a.link_underline(
      @click.prevent="askForShippingDetails"
      href='#') « Ingresé mal el número de seguimiento o devolví de otra forma

//- La compradora marcó la devolución cómo enviada.
.dashboard__subitem(v-else-if="sale_return.status === 41")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_warning.i-reload <strong>Devolución:&nbsp;</strong> esperando confirmación de la vendedora
  .dashboard__actions
    p Escogiste juntarte con la vendedora. Estamos esperando que ella nos confirme que ya le entregaste la devolución.
    router-link.link_underline(
      :to="{ name: 'privateMessage', params: { recipientId: sale.user_id }}") Escribir a la vendedora
    .break
      span.break__txt O
    a.link_underline(
      @click.prevent="askForShippingDetails"
      href='#') « La entregué de otra forma

.dashboard__subitem(v-else-if="sale_return.status === 49")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_warning.i-reload Esperando confirmación de recibido de la vendedora

.dashboard__subitem(v-else-if="sale_return.status === 90")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_alert.i-reload Devolución completada.

.dashboard__subitem(v-else-if="sale_return.status === 99")
  .dashboard__subtitle(v-if="mqTabletMax") Estado de la compra
  .dashboard__status
    p.status.status_alert.i-reload Compra finalizada, se venció el plazo de devolución.
</template>

<script src="./js/Devuelta.js"></script>
