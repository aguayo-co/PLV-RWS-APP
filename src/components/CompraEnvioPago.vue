<template lang="pug">
.list__content
  //-Compra: Envío y pago: 1a Cliente Registrado, logueado
  section.list_step
    h2.subhead Selecciona tu método de envío
    //- metodos de envío
    CompraSale(
      v-for="sale in sales"
      :key="sale.id"
      :sale="sale")

    //- direcciones editable
    .compra-data_info
      .subhead Direcciones
        small.small_high Esta sería la dirección a la que la vendedora enviará tu producto. También servirá de referencia en caso de que decidan juntarse.
      div(v-if="address") {{ address.address }},  {{ address.region }},  {{ address.city }}, {{ address.zone }}
      .subhead Cambiar dirección?
      AddressList(in-shopping-cart=true)

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
              v-if="!phone && !editPhone") Aún no has ingresado tú número de teléfono
            input.form__edit(
              v-else=""
              v-model='new_phone',
              id='editPhone',
              :placeholder="phone",
              :disabled="!editPhone"
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
        p.pay-off__value {{ credits }} <small class="pay-off__small">Créditos</small>
      form.pay-off__item
        label.pay-off__label(
          for="creditos-on") Usar en esta compra
        .pay-off__group
          span.help(
            v-show="errorLog.used_credits") {{ errorLog.used_credits }}
          input.form__control.pay-off__control(
            id="creditos-on",
            type="text",
            :disabled='disabled.used_credits',
            v-model='new_used_credits')
          small.pay-off__small Créditos
    //-tipo de medio de pago
    h3.subhead ¿Con que medio te gustaría pagar?
    //-checkbox tipo pago
    .boxcheck-wrap
      .boxcheck
        form.boxcheck__grid
          //-item 2
          .boxcheck__card
            input.form__input-radio(
              id="PayU",
              type="radio",
              value="pay_u",
              v-model="payment_method")
            label.form__label.form__label_radio(
              for="PayU")
              span.boxcheck__box
                img(src="/static/img/logo-payu.png", alt="Pagar por medio de PayU")
          //-end item 2
          //-item 3
          .boxcheck__card
            input.form__input-radio(
              id="transferencia",
              type="radio",
              value="transfer",
              v-model="payment_method")
            label.form__label.form__label_radio(
              for="transferencia")
              span.boxcheck__box
                span Transferencia Bancaria
          //-end item 3
</template>

<script src="./js/CompraEnvioPago.js"></script>
