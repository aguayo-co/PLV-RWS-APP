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
          CompraEnvioPago
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
import CompraEnvioPago from '@/components/CompraEnvioPago'
export default {
  name: 'Compra',
  components: {
    CompraCarro,
    CompraEnvioPago
  }
}
</script>
