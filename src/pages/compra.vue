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
                  dt.data-table__item Código de descuento
                  dd.data-table__value $88.300.000
                dl.data-total
                  dt.data-total__label Total de tu orden:
                  dd.data-total__value $60.000
                //- end List Detalle de tu orden

                //-código de descuento
                form.form.data-form
                  .form__row.form__row_away
                    label.form__label.form__label_high(
                      for='codigo') ¿Tienes algún código de descuento?
                    .form__combo
                      input.form__control.combo__control(
                        id='codigo'
                        type='text')
                      button.btn.btn_solid.combo__btn Validar
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

    //Paso 3: Comprobante
    section.list-slot
      header
        h2 ¡Genial! tu compra ha sido realizada
        p.small_high Ya envíamos un comprobante de compra a tu correo.
      //1c Cliente Registrado, logueado, comprando a la misma vendedora varias prendas
      .list-slot__content
      //1d Cliente Registrado, logueado, comprando a  diferentes vendedoras
      .list-slot__content
        //-Item 1
        article.list__card
          //-link a producto
          router-link.card__product(
            to="#",
            title="")

            //-img producto
            .card__figure
              img.card__img(
                src="/static/img/demo/product-001.jpg",
                alt="")

            //-info producto
            .card__info
              .card__header
                h3.card__title Blusa Blanca Forever 21
                p.card__brand Marca: Forever 21
                p.card__size Talla: S
              p.card__price $ 21.000
              p.card__tag.tag Prenda usada

          //-info User
          .card__column
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

            //-datos contacto usuaria
            .card__actions
              p Teléfono: 9 87654890
              p Correo: mail@gmail.com
              //p Envío: Acuerdo con vendedora
              p Envío: ChileExpress
              p Fecha estimada: Abr 21 de 2018

              
        //-End Item 1

    //End Paso 3: Comprobante

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
