<template lang="pug">
.single__step
  h4.single__title Comprar Créditos
  .pay-off.pay-off_center
    .pay-off__item
      p.pay-off__value $ 12900
    .pay-off__item
      p.pay-off__label Créditos Prilov disponibles
      p.pay-off__value = 12900
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
            value="pay_u")
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
            value="transfer")
          label.form__label.form__label_radio(
            for="transferencia")
            span.boxcheck__box
              span Transferencia Bancaria
        .step-data__box
          button.btn.btn_solid Pagar
      .step-data__box
        a.link_underline(href='#') No quiero ser una Prilover Star
        //-end item 3
</template>

<script>

export default {
  name: 'UserComprarCreditos'
}
</script>
