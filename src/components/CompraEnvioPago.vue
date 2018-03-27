<template lang="pug">
section.list_step
  h3.subhead Elige una opción de despacho
  //- metodos de envío Caso: 1 vendedora 1 prenda
  .boxcheck-wrap
    .boxcheck
      form.boxcheck__grid.boxcheck__grid_tip
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
  .boxcheck-wrap
    //- metodos de envío vendedora lista de productos
    .boxcheck.boxcheck_card
      //-listado productos
      .boxcheck__list
        //-item 1
        .boxcheck__card
          .boxcheck__figure
            img.media-img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          .boxcheck__info
            .boxcheck__lead
              p.boxcheck__title Blusa Blanca Forever 21
              p.boxcheck__size
                span.boxcheck__size-txt XL
            p.boxcheck__price $10.000
        //-end item 1
        //-item 2
        .boxcheck__card
          .boxcheck__figure
            img.media-img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          .boxcheck__info
            .boxcheck__lead
              p.boxcheck__title Blusa Blanca Forever 21
              p.boxcheck__size
                span.boxcheck__size-txt M
            p.boxcheck__price $10.000
        //-end item 2
        //-item 3
        .boxcheck__card
          .boxcheck__figure
            img.media-img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          .boxcheck__info
            .boxcheck__lead
              p.boxcheck__title Blusa Blanca Forever 21
              p.boxcheck__size
                span.boxcheck__size-txt S
            p.boxcheck__price $10.000
        //-end item 3
      //-end listado productos
      //-Métodos de envío por vendedora
      .boxcheck__actions
        .boxcheck__sticky
          .boxcheck__header
            //-link a usuario
            router-link.card__user(
              to="#",
              title="")
              .card__user-img
                .card__avatar
                  img.card__picture(
                    src="/static/img/demo/user-avatar-009.jpg",
                    alt="")
              .card__user-info
                .card__status Vendedora
                .card__prilover  Daniela Villanueva
            h4.boxcheck__headline Métodos de envío que ofrece esta vendedora
          form.boxcheck__grid.boxcheck__grid_tip
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
      //-End Métodos de envío por vendedora
    //- 2a Despacho varias prendas
    .boxcheck.boxcheck_card
      .boxcheck__list
        .boxcheck__card
          .boxcheck__figure
            img.media-img(
              src="/static/img/demo/product-001.jpg",
              alt="")

          //-info producto
          .boxcheck__info
            .boxcheck__lead
              p.boxcheck__title Blusa Blanca Forever 21
              p.boxcheck__size
                span.boxcheck__size-txt  3xl
            p.boxcheck__price $10.000
      .boxcheck__actions
        .boxcheck__sticky
          .boxcheck__header
            //-link a usuario
            router-link.card__user(
              to="#",
              title="")
              .card__user-img
                .card__avatar
                  img.card__picture(
                    src="/static/img/demo/user-avatar-006.jpg",
                    alt="")
              .card__user-info
                .card__status Vendedora
                .card__prilover  Adriana Castillo
            h4.boxcheck__headline Métodos de envío que ofrece esta vendedora
          form.boxcheck__grid.boxcheck__grid_tip
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

  //- direcciones editable
  .compra-data_info
    .subhead Direcciones
      small.small_high Esta sería la dirección a la que la vendedora enviará tu producto. También servirá de referencia en caso de que decidan juntarse.
    address-list
    .subhead Teléfono
      small.small_high Danos tu número celular  para que el vendedor pueda comunicarse contigo
    //- tel editable
      ToDo: componente tel

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

<script>
import AddressList from '@/components/AddressList'
export default {
  name: 'CompraEnvioPago',
  components: {
    'address-list': AddressList
  }
}
</script>
