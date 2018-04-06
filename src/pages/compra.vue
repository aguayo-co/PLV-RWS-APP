<template lang="pug">
.layout-page
  .layout-band
    .layout-inner
      header.page__head
        h1.title__main Tu Carrito de Compras
      ul.steps__list
        li.steps__item.steps__item_current
          span.steps__bullet.i-ok 1
          span.steps__label Carro y Envío
          //-TO DO: Valor compra
          span.steps__value $65.000
        li.steps__item
          span.steps__bullet.i-ok  2
          span.steps__label Pago
        li.steps__item
          span.steps__bullet.i-ok  3
          span.steps__label Comprobante

  .layout-inner
    // List paso 1:compra y 2:envío y pago
    .list
      //-grid
      .list__grid
        //-list content
        CompraEnvioPago(v-if="isShoppingCart")
        //-end list content

        //-Tabla Total
        CompraDetalle(v-if="isShoppingCart")
        //-End Tabla Total
      //-End grid
    //End List paso 1:compra y 2:envío y pago

    //Paso 3: Comprobante
    section.list-slot
      header.header_heart.i-heart-on
        h2.title_heart ¡Genial! tu compra ha sido realizada
        p.subtitle_heart Ya envíamos un comprobante de compra a tu correo.
      //- To do: crear componente
      //1c Cliente Registrado, logueado, comprando a la misma vendedora varias prendas
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
        //-End Item 1
        //-Item 2
        article.list__card
          //-link a producto
          router-link.card__product(
            to="#",
            title="")

            //-img producto
            .card__figure
              img.card__img(
                src="/static/img/demo/product-005.jpg",
                alt="")

            //-info producto
            .card__info
              .card__header
                h3.card__title Chaqueta de cuero Dorada
                p.card__brand Marca: Naf Naf
                p.card__size Talla: M
              p.card__price $ 30.000
              p.card__tag.tag Prenda usada
        //-End Item 2
      //-End list content
      dl.dividers.dividers_list
        dt.subhead Dirección de envío
        dd.dividers__item Alberto Blest Gana 803, Padre Hurtado, Santiago
        dt.subhead Fecha estimada de entrega
        dd.dividers__item 5/11/2017
        dt.subhead Datos de la vendedora
        //-info User
        dd.dividers__item
          //-link a usuario
          .dividers_table
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
              .card__data
                p.card__txt <strong class="card__label">Teléfono:</strong> 9 87654890
                p.card__txt <strong class="card__label">Correo:</strong>  mail@gmail.com

      //- To do: crear componente
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
              .card__data
                p.card__txt <strong class="card__label">Teléfono:</strong> 9 87654890
                p.card__txt <strong class="card__label">Correo:</strong>  mail@gmail.com
                p.card__txt <strong class="card__label">Envío:</strong> ChileExpress
                p.card__txt <strong class="card__label">Fecha estimada:</strong> Abr 21 de 2018
        //-End Item 1
        //-Item 2
        article.list__card
          //-link a producto
          router-link.card__product(
            to="#",
            title="")

            //-img producto
            .card__figure
              img.card__img(
                src="/static/img/demo/product-005.jpg",
                alt="")

            //-info producto
            .card__info
              .card__header
                h3.card__title Chaqueta de cuero Dorada
                p.card__brand Marca: Naf Naf
                p.card__size Talla: M
              p.card__price $ 30.000
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
                    src="/static/img/demo/user-avatar-002.jpg",
                    alt="")
              .card__user-info
                .card__status Vendedora
                .card__prilover  Isabel Granados

            //-datos contacto usuaria
            .card__actions
              .card__data
                p.card__txt <strong class="card__label">Teléfono:</strong> 9 87654890
                p.card__txt <strong class="card__label">Correo:</strong>  mail@gmail.com
                p.card__txt <strong class="card__label">Envío:</strong> ChileExpress
                p.card__txt <strong class="card__label">Fecha estimada:</strong> Abr 21 de 2018
        //-End Item 2
      //-End list content
      dl.dividers.dividers_list
        dt.subhead Dirección de envío
        dd.dividers__item Alberto Blest Gana 803, Padre Hurtado, Santiago
        dt.subhead Fecha estimada de entrega
        dd.dividers__item 5/11/2017

      .form__grid.form__grid_center.form__row_away
        .form__row
          a.btn.btn_solid(href="#", title="Ir a Vitinear") Vitinear
        .form__row
          a.btn(href="#", title="Ir a mis compras") Ir a mis compras
      a.form-brand(href='/', title='Ir a la página de inicio')
        span.brand
          img.brand__logo(src='/static/img/brand-prilov.png', alt='Prilov Compra. Usa. Vende')
          span.brand__typo
            strong.brand__name Prilov.com
            span.brand__tagline  Compra. Usa. Vende.
    //End Paso 3: Comprobante
    .modal__slot.content-slot
      .content-slot__inner
        .notify
          h2.title.notify__title  Estás a un paso de obtener tu compra.
          p.subtitle_heart Aun no has terminado tu compra, sube tu comprobante de pago.
          .notify__body
            form.form.form_file
              input.form__file(
                type="file",
                name="file-comprobante",
                id="file-comprobante",
                multiple="")
              label.form__label_file(for="file-comprobante")
                span.form__file-txt Selecciona archivo
                .form__file-input
                  span.form-file__txt no se elegió archivo
                  span.form-file__btn Subir
            p.notify__txt Recuerda que tienes un máximo de 10 minutos para realizar tu transferencia, de lo contrario tu compra se cancelará automáticamente
          .notify__footer
              button.btn.btn_solid Enviar comprobante
</template>

<script src="./js/compra.js"></script>
