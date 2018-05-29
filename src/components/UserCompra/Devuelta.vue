<template lang="pug">
//- La compradora no ha enviado le producto de vuelta.
.dashboard__subitem(v-if="!sale_return")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload En proceso de devolución
.dashboard__subitem(v-else-if="sale_return.status === 0")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload A la espera de que devuelvas el producto
  .dashboard__actions
    p Tienes 4 días 23 horas para confirmar el envío y colocar el número de seguimiento
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
          for='getNumber') Ingresa el número de seguimiento.
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
      href='#') Acordar juntarme con la vendedora
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")

//- La compradora marcó la devolución cómo enviada.
.dashboard__subitem(v-else-if="sale_return.status === 40")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Esperando confirmación de recibido de la Vendedora.
  .dashboard__actions
    p Ya nos informaste que devolviste el pedido:
    p Empresa: Correos de Chile
    p Número de Seguimiento: AS123102931203
    p Estamos esperando que la vendedora nos confirme que recibió la devolución.
    a.link_underline(
      @click.prevent="askForShippingDetails"
      href='#') « Ingresé mal el número de seguimiento o devolví de otra forma
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")

//- La compradora marcó la devolución cómo enviada.
.dashboard__subitem(v-else-if="sale_return.status === 41")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Esperando confirmación de recibido de la Vendedora.
  .dashboard__actions
    p Escogiste juntarte con la vendedora. Estamos esperando que ella nos confirme que ya le entregaste la compra.
    a.link_underline(
      href='#') Escribir a la vendedora
    .break
      span.break__txt O
    a.link_underline(
      href='#') « Lo entregué de otra forma
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")

.dashboard__subitem(v-else-if="sale_return.status === 49")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_warning.i-reload Esperando confirmación de recibido de la Vendedora.
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")

.dashboard__subitem(v-else-if="sale_return.status === 90")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_alert.i-reload Producto devuelto.
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")

.dashboard__subitem(v-else-if="sale_return.status === 99")
  .dashboard__subtitle(v-if="mqTabletMax") Estado del producto
  .dashboard__status
    p.status.status_alert.i-reload Devolución cancelada.
  Calificar(:sale="sale" v-on:refresh-sale="$emit('refresh-sale', $event)")
</template>

<script src="./js/Devuelta.js"></script>
