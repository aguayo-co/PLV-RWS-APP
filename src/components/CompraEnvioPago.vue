<template lang="pug">
.list__content
  //-Compra: Envío y pago: 1a Cliente Registrado, logueado
  section.list_step(v-if="shoppingCartStep === null")
    //- metodos de envío
    .compra-data_info
      .subhead.subhead_top Selecciona tu método de envío
      CompraSale(
        v-for="sale in sales"
        :errors="allErrors"
        :key="sale.id"
        :sale="sale"
        v-on:clearError="$emit('clearError', $event)")

      template(v-if='hasChilexpress')
        .subhead Dirección de envío
        //- direcciones editable
        span.help(
          v-if="allErrors.address") {{ allErrors.address }}
        AddressList(
          :in-shopping-cart="true"
          v-on:updatedAddress="updateShippingInformation")

      .subhead Teléfono
      form.form_user(
        id="form-user-phone"
        v-on:submit.prevent='updatePhone')
        .dividers__item(
          :class="{'dividers__item_active' :editing}")
          span.help(
            v-if="allErrors.phone") {{ allErrors.phone }}
          .dividers__grid
            input.form__edit(
              @input="$emit('clearError', 'phone')"
              v-model='new_phone',
              :placeholder="phone",
              :disabled="!editing"
              type='tel')

            span.dividers__actions
              button.btn-tag(
                v-if="editing") Guardar
              a.dividers__edit.i-edit-line(
                v-if="phone"
                @click.prevent="toggleEditPhone",
                href="#",
                title="Editar Teléfono") <small class="hide"> Editar </small>

    //-créditos
  section.list_step(v-if="shoppingCartStep === 'medio-de-pago'")
    a(
      @click.prevent="$emit('setShoppingCartStep', null)") Volver
    h3.subhead(v-if="credits") ¿Quieres usar tus créditos en esta compra?
    .pay-off(v-if="credits")
      .pay-off__item
        p.pay-off__label Créditos Prilov disponibles
        p.pay-off__value {{ credits|currency }} <small class="pay-off__small">Créditos</small>
      form.pay-off__item(
        @submit.prevent=false)
        label.pay-off__label(
          for="creditos-on") Usar en esta compra
        .pay-off__group
          span.help(
            v-if="allErrors.used_credits") {{ allErrors.used_credits }}
          input.form__control.pay-off__control(
            id="creditos-on",
            type="number",
            min=0
            :max="credits"
            step=1
            :disabled='disabled.used_credits',
            v-model='new_used_credits')
          small.pay-off__small Créditos
    //-tipo de medio de pago
    h3.subhead ¿Con que medio te gustaría pagar?
    //-checkbox tipo pago
    span.help(
      v-if="errors.gateway") {{ errors.gateway }}
    .boxcheck-wrap
      .boxcheck
        form.boxcheck__grid
          //-item 1
          .boxcheck__card(v-if="due > 0")
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
          .boxcheck__card(v-if="due > 0")
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
          .boxcheck__card(v-if="due > 0")
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
          //-item 4
          .boxcheck__card(v-if="due == 0")
            input.form__input-radio(
              id="SinPago",
              type="radio",
              value="free",
              v-model="gateway")
            label.form__label.form__label_radio(
              for="SinPago")
              span.boxcheck__box
                span Sin pago
          //-end item 4
</template>

<script src="./js/CompraEnvioPago.js"></script>
