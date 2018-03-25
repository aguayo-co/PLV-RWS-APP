<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item.steps__item_current
          span.steps__bullet.i-ok 1
          span.steps__label Carro
          //-TO DO: Valor compra
          span.steps__value $65.000
        li.steps__item
          span.steps__bullet.i-ok  2
          span.steps__label Envío y pago
        li.steps__item
          span.steps__bullet.i-ok  3
          span.steps__label Comprobante

  .layout-inner
    .list
      h2.subhead Carro
      .list__grid
        .list__content
          //-Compra Listado de productos: 1a Cliente Registrado, logueado
          CompraCarro
          //-Compra 1b Cliente Registrado, logueado
          section.list_step
            h3.subhead Elige una opción de despacho
            //-checkbox tipo envíos
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
            //-end checkbox tipo envíos

            //- direcciones| Correo | tel
                Este componente se toma de User/data
                se integran las funcionalidades desarrolladas
                por Federico.
                archivo /components/CompraFormUserData.vue
            UserData
            //-End direcciones| Correo | tel

            //-créditos
            h3.subhead ¿Quieres usar tus créditos en esta compra?
            .pay-off
              .pay-off__item
                p.pay-off__label Créditos Prilov disponibles
                p.pay-off__value 2.100 <small class="pay-off__small">Créditos</small>
              .pay-off__item
                label.pay-off__label(
                  for='creditos-on') Usar en esta compra
                .pay-off__group
                  input.form__control.pay-off__control(
                    id='creditos-on'
                    type='text')
                  small.pay-off__small Créditos
            //-tipo de medio de pago
            h3.subhead ¿Con que medio te gustaría pagar?
            //-checkbox tipo pago
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

        //Tabla Total
        .list__side
          .list__frame
            h3.title Detalle de tu orden
            .list__data
              .list__data-table
                dl.data-table
                  dt.data-table__item Chaqueta
                  dd.data-table__value $34.000
                  dt.data-table__item Total de la orden
                  dd.data-table__value $88.300.000
                  dt.data-table__item Código de descuento
                  dd.data-table__value $88.300.000
                dl.data-total
                  dt.data-total__label Total de tu orden:
                  dd.data-total__value $60.000
              .list__data-form
                form.form.data-form
                  //- código de descuento
                  .form__row.form__row_away
                    label.form__label.form__label_high(
                      for='codigo') ¿Tienes algún código de descuento?
                    input.form__control(
                      id='codigo'
                      type='text')
                  .form__row
                    button.btn.btn_solid.btn_block Continuar
                //- Agregar productos
                span.i-plus.plus-item
                  router-link.link_underline(
                    to="#") Agregar más Productos
        //End Tabla Total

      //End contenido

    //Section
</template>

<script>
import CompraCarro from '@/components/CompraCarro'
import UserData from '@/components/CompraFormUserData'
export default {
  name: 'Compra',
  components: {
    CompraCarro,
    UserData
  }
}
</script>
