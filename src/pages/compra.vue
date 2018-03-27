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
    // List paso 1:compra y 2:envío y pago
    .list
      h2.subhead Carro
      //-grid
      .list__grid
        //-list content
        .list__content
          //-Compra Listado de productos: 1a Cliente Registrado, logueado
          CompraCarro
          //-Compra 1b Cliente Registrado, logueado
          CompraEnvioPago
        //-end list content

        //-Tabla Total
        .list__side
          .list__frame
            h3.title Detalle de tu orden
            .list__data
              .list__data-table
                //- List Detalle de tu orden
                dl.data-table
                  dt.data-table__item Chaqueta
                  dd.data-table__value $34.000
                  dt.data-table__item Total de la orden
                  dd.data-table__value $88.300.000
                  //estado sin creditos
                  dt.data-table__item Código de descuento
                  dd.data-table__value $0
                  //estado con créditos OK
                    add class .txt_brand to .data-table__value
                  dt.data-table__item Código de descuento
                  dd.data-table__value.txt_brand -$5.000
                dl.data-total
                  dt.data-total__label Total de tu orden:
                  dd.data-total__value $60.000
                //- end List Detalle de tu orden

                //-código de descuento
                   Estado inicial
                form.form.data-form
                  .form__row.form__row_away
                    label.form__label(
                      for='codigo') ¿Tienes algún código de descuento?
                    .form__combo
                      input.form__control.combo__control(
                        id='codigo'
                        type='text')
                      button.btn.combo__btn Validar
                //- end código de descuento
                //código de descuento
                    Estado OK:
                    add class .form__combo_ok.i-ok to .form__combo
                form.form.data-form
                  .form__row.form__row_away
                    label.form__label(
                      for='codigo') ¿Tienes algún código de descuento?
                    .form__combo.form__combo_ok.i-ok
                      input.form__control.combo__control(
                        id='codigo'
                        type='text')
                //- end código de descuento

                //- btn continuar
                .form__row
                  button.btn.btn_solid.btn_block Continuar
                //- end btn continuar

                //- Agregar productos
                .form__row_away
                  span.i-plus.plus-item
                    router-link.link_underline(
                      to="#") Agregar más Productos
                //- End Agregar productos
        //-End Tabla Total
      //-End grid
    //End List paso 1:compra y 2:envío y pago

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
