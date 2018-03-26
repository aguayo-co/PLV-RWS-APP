<template lang="pug">
section.list_step
  h3.subhead Elige una opción de despacho
  //- metodos de envío Caso: 1 vendedora 1 prenda
  form.boxcheck-wrap
    .boxcheck
      .boxcheck__grid.boxcheck__grid_tip
        //-item 1
        .boxcheck__item
          input.form__input-radio(
            id="estandar",
            type="radio",
            name="envio",
            value="estandar",
            checked="checked")
          label.form__label.form__label_radio(
            for="estandar")
            span.boxcheck__label
              span Envío estándar (Chilexpress) <small class="boxcheck__disclaimer">($3000)</small>
          //-nota
          .boxcheck__tip
            p Al seleccionar esta opción de despacho, las entregas son según su disponibilidad y efectuadas de Lunes a Sábado.
            p Tiempo de entrega entre 1 y 5 días hábiles
        //-end item 1
        //-item 2
        .boxcheck__item
          input.form__input-radio(
            id="ultra",
            type="radio",
            name="envio",
            value="ultra",
            checked="checked")
          label.form__label.form__label_radio(
            for="ultra")
            span.boxcheck__label
              span Envío ultra rápido (Chilexpress) <small class="boxcheck__disclaimer">($5000)</small>
        //-end item 2
        //-item 3
        .boxcheck__item
          input.form__input-radio(
            id="saleswoman",
            type="radio",
            name="envio",
            value="saleswoman",
            checked="checked")
          label.form__label.form__label_radio(
            for="saleswoman")
            span.boxcheck__label
              span Acuerdo envío con vendedora <small class="boxcheck__disclaimer">($3000)</small>
        //-end item 3
  //-end metodos de envío Caso: 1 vendedora 1 prenda

  //- metodos de envío Caso: 1 vendedora varias prendas 
  form.boxcheck-wrap
    //- metodos de envío vendedora lista de productos
    .boxcheck.boxcheck_card
      .boxcheck__list
        .boxcheck__card
          .card__figure
            img.card__img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          p.card__title Blusa Blanca Forever 21
        .boxcheck__card
          .card__figure
            img.card__img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          p.card__title Blusa Blanca Forever 21
        .boxcheck__card
          .card__figure
            img.card__img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          p.card__title Blusa Blanca Forever 21
      .boxcheck__grid.boxcheck__grid_tip
        //-item 1
        .boxcheck__item
          input.form__input-radio(
            id="estandar1",
            type="radio",
            name="envio",
            value="estandar1",
            checked="checked")
          label.form__label.form__label_radio(
            for="estandar1")
            span.boxcheck__label
              span Envío estándar (Chilexpress) <small class="boxcheck__disclaimer">($3000)</small>
          //-nota
          .boxcheck__tip
            p Al seleccionar esta opción de despacho, las entregas son según su disponibilidad y efectuadas de Lunes a Sábado.
            p Tiempo de entrega entre 1 y 5 días hábiles
        //-end item 1
        //-item 2
        .boxcheck__item
          input.form__input-radio(
            id="ultra1",
            type="radio",
            name="envio",
            value="ultra1",
            checked="checked")
          label.form__label.form__label_radio(
            for="ultra1")
            span.boxcheck__label
              span Envío ultra rápido (Chilexpress) <small class="boxcheck__disclaimer">($5000)</small>
        //-end item 2
        //-item 3
        .boxcheck__item
          input.form__input-radio(
            id="saleswoman1",
            type="radio",
            name="envio",
            value="saleswoman1",
            checked="checked")
          label.form__label.form__label_radio(
            for="saleswoman1")
            span.boxcheck__label
              span Acuerdo envío con vendedora <small class="boxcheck__disclaimer">($3000)</small>
        //-end item 3
    //- 2a Despacho varias prendas
    .boxcheck.boxcheck_card
      .boxcheck__card
        .card__figure
          img.card__img(
            src="/static/img/demo/product-001.jpg",
            alt="")

        //-info producto
        p.card__title Blusa Blanca Forever 21
      .boxcheck__grid.boxcheck__grid_tip
        //-item 1
        .boxcheck__item
          input.form__input-radio(
            id="saleswoman2",
            type="radio",
            name="envio",
            value="saleswoman2",
            checked="checked")
          label.form__label.form__label_radio(
            for="saleswoman2")
            span.boxcheck__label
              span Acuerdo envío con vendedora <small class="boxcheck__disclaimer">($3000)</small>
          //-nota
          .boxcheck__tip
            p La vendedora prefiere acordar el envío. Podrán acordar si juntarse o enviar por pagar.
        //-end item 1

  //- end 2 a Despacho por prenda

  //- direcciones| Correo | tel
    ToDo: componente direcciones y teléfono
  //-End direcciones| Correo | tel

  //-créditos
  h3.subhead ¿Quieres usar tus créditos en esta compra?
  .pay-off
    .pay-off__item
      p.pay-off__label Créditos Prilov disponibles
      p.pay-off__value 2.100 <small class="pay-off__small">Créditos</small>
    .pay-off__item
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
  .boxcheck_wrap
    .boxcheck
      .boxcheck__grid
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

<script>
export default {
  name: 'CompraEnvioPago'
}
</script>
