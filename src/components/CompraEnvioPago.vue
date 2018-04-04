<template lang="pug">
section.list_step
  h3.subhead Elige una opción de despacho
  //- metodos de envío Caso: 1 vendedora varias prendas
  .boxcheck-wrap
    <compra-sale v-for="sale in sales" :key="sale.id" :sale=sale></compra-sale>

  //- direcciones editable
  .compra-data_info
    .subhead Direcciones
      small.small_high Esta sería la dirección a la que la vendedora enviará tu producto. También servirá de referencia en caso de que decidan juntarse.
    address-list
    .subhead Teléfono
      small.small_high Danos tu número celular para que el vendedor pueda comunicarse contigo
    form.form_user(
      id="form-user-phone"
      v-on:submit.prevent='updatePhone')
      .dividers__item(
        :class="{'dividers__item_active' :editPhone == true}")
        span.help(
          v-show="editPhone == true && errorLog.phone") {{ errorLog.phone }}
        .dividers__grid
          span.user-data__holder(
            v-if="phone == null && editPhone == false") Aún no has ingresado tú número de teléfono
          input.form__edit(
            v-else=""
            v-model='order_phone',
            id='editPhone',
            :placeholder="phone",
            :disabled="editPhone == false"
            type='tel')

          span.dividers__actions
            button.btn-tag(
              v-show="editPhone == true") Guardar
            a.dividers__edit.i-edit-line(
              @click.prevent="toggle('editPhone')",
              href="#",
              title="Editar Teléfono") <small class="hide"> Editar </small>

  //-créditos
  h3.subhead ¿Quieres usar tus créditos en esta compra?
  .pay-off
    .pay-off__item
      p.pay-off__label Créditos Prilov disponibles
      p.pay-off__value 2.100 <small class="pay-off__small">Créditos</small>
    form.pay-off__item
      label.pay-off__label(
        for="creditos-on") Usar en esta compra
      .pay-off__group
        input.form__control.pay-off__control(
          id="creditos-on",
          type="text")
        small.pay-off__small Créditos
  //-tipo de medio de pago
  h3.subhead ¿Con que medio te gustaría pagar?
  //-checkbox tipo pago
  .boxcheck-wrap
    .boxcheck
      form.boxcheck__grid
        //-item 1
        .boxcheck__item
          input.form__input-radio(
            id="mercado",
            type="radio",
            name="envio",
            value="mercado",
            checked="checked")
          label.form__label.form__label_radio(
            for="mercado")
            span.boxcheck__label
              img(src="/static/img/logo-mercado-pago.png", alt="Pagar por medio de Mercado Pago")
        //-end item 1
        //-item 2
        .boxcheck__item
          input.form__input-radio(
            id="PayU",
            type="radio",
            name="envio",
            value="PayU",
            checked="checked")
          label.form__label.form__label_radio(
            for="PayU")
            span.boxcheck__label
              img(src="/static/img/logo-payu.png", alt="Pagar por medio de PayU")
        //-end item 2
        //-item 3
        .boxcheck__item
          input.form__input-radio(
            id="transferencia",
            type="radio",
            name="envio",
            value="transferencia",
            checked="checked")
          label.form__label.form__label_radio(
            for="transferencia")
            span.boxcheck__label
              span Transferencia Bancaria
        //-end item 3
</template>

<script src="./js/CompraEnvioPago.js"></script>
