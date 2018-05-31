<template lang="pug">
.list__content
  //-Compra: Envío y pago: 1a Cliente Registrado, logueado
  section.list_step(v-if="shoppingCartStep === null")
    h2.subhead Selecciona tu método de envío
    //- metodos de envío
    CompraSale(
      v-for="sale in sales"
      :key="sale.id"
      :sale="sale")

    //- direcciones editable
    .compra-data_info
      .subhead.subhead_top Dirección de envío
      AddressList(:in-shopping-cart="true", v-on:updatedAddress="updateShippingInformation")

      .subhead Teléfono
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
  section.list_step(v-if="shoppingCartStep === 'método'")
    a(
      @click.prevent="$emit('setShoppingCartStep', null)") Volver
    h3.subhead(v-show="credits") ¿Quieres usar tus créditos en esta compra?
    .pay-off(v-show="credits")
      .pay-off__item
        p.pay-off__label Créditos Prilov disponibles
        p.pay-off__value {{ credits|currency }} <small class="pay-off__small">Créditos</small>
      form.pay-off__item(
        @submit.prevent=false)
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
          //-item 1
          .boxcheck__card
            input.form__input-radio(
              id="MercadoPago",
              type="radio",
              value="mercado_pago",
              v-model="gateway")
            label.form__label.form__label_radio(
              for="MercadoPago")
              span.boxcheck__box
                img(src="/static/img/logo-mercado-pago.png", alt="Pagar por medio de MercadoPago")
          //-end item 1
          //-item 2
          .boxcheck__card
            input.form__input-radio(
              id="PayU",
              type="radio",
              value="pay_u",
              v-model="gateway")
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
              v-model="gateway")
            label.form__label.form__label_radio(
              for="transferencia")
              span.boxcheck__box
                span Transferencia Bancaria
          //-end item 3
</template>

<script src="./js/CompraEnvioPago.js"></script>
