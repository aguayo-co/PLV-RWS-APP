<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Compras
    FilterUser
    //componente tabla
    .dashboard
      header.dashboard__head
        h2.dashboard__title Productos
        h3.dashboard__title Estado del producto
      UserCompra(
        v-for="sale in sortedSales" :order="orders[sale.order_id]" :sale="sale" :key="sale.id" v-on:refresh-order="setOrder")
      .dashboard__item
        .dashboard__data
            p.dashboard__high Número de Orden: 12384746
            p 21/9/2017
        .dashboard__grid
          .dashboard__subitem
            article.list__card
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
                    p.card__size Talla: S
                  p.card__price $ 21.000
                  .card__user-data
                    p Compradora: Daniela Villanueva
                    p Teléfono: 97736545
                    p Dirección: Av. Pajaritos 1309, maipu

          .dashboard__subitem
            //-1
            .dashboard__status
              p.status.status_alert.i-alert-circle Pendiente de pago
            .dashboard__actions
              p Aún no has terminado tu compra, sube tu comprobante de pago.
              form.form.form_file
                input#file-comprobante.form__file(
                  type='file',
                  name='file-comprobante',
                  multiple='multiple')
                label.form__label_file(for='file-comprobante')
                  .form__file-input
                    span.form-file__txt Selecciona archivo
                    span.form-file__btn Subir
              p Tienes:
                span.dashboard__txt-big 10 Minutos
                | antes de que tu compra se anule
            //-1_2
            //- Flujo desde btn => Btn Subir
            .dashboard__actions
              p.status.status_warning.i-reload Comprobante de pago en proceso de validación.
              p Ya nos enviaste tu comprobante de pago, ahora estamos validando la transacción.
              a.link_underline(
              href="#") « Creo que subí el comprobante incorrecto
            //-1_2a
            //- Flujo de Opción 1 => Anulada
            .dashboard__actions
              p.status.status_alert.i-x Compra anulada
              p Tu compra fue anulada porque no cargaste un comprobante o era incorrecto.
            //-1_2b
            //- Flujo de Opción 2 => Confirmada A la espera
            .dashboard__actions
              p.status.status_check.i-check Compra confirmada y pago recibido
              p.status.status_warning.i-reload A la espera de envío
              p Tu pedido está en proceso de empaque y envío por parte de la vendedora.
            //-1_2c
            //- Flujo desde => Compra confirmada y pago recibido
            .dashboard__status
              p.status.status_check.i-check Compra confirmada y pago recibido
              p.status.status_check.i-check Enviado
              p Nº de seguimiento: 00123123123
              p Empresa de mensajería: Chile Express
              a.link_underline(href='#') ¿Dónde está mi paquete?
            .dashboard__actions
              p ¿Ya recibiste este producto?
              a.btn.btn_solid.btn_block(
              href='#') Si, Recibí y me lo quedo
              a.link_underline(
              href='#') ¿Algo no te gustó de tu producto?
            //-1_2d
            //- Flujo de Opción 3 => Confirmada Esperando
            .dashboard__actions
              p.status.status_check.i-check Compra confirmada y pago recibido
              p.status.status_warning.i-reload Esperando que se junten o acuerden envío.
              p Seleccionaste la opción de acordar la entrega con la vendedora.
              a.link_underline(href='#') Escribir a la vendedora
            //-1_2e
            //- Flujo desde => Compra confirmada - ya entregó
            .dashboard__actions
              p.status.status_check.i-check Compra confirmada y pago recibido
              p.status.status_check.i-check La compradora ya te entregó el producto
              p ¿Ya recibiste este producto?
              a.btn.btn_solid.btn_block(
              href='#') Si, Recibí y me lo quedo
              a.link_underline(
              href='#') ¿Algo no te gustó de tu producto?
            //-1_2f
            //- Flujo desde => Si, Recibí y me lo quedo
            .dashboard__actions
              p ¿Qué tal estuvo tu compra?
              //-Notificaciones
              .user-data__notify
                ul.user-data__list
                  li.user-data__value.i-like 20
                  li.user-data__value.i-like.i_flip 0
                  li.user-data__value.i-less-circle 0
              .form.dashboard__form
                .form__row
                  label.form__label(
                  for='CommentSale') Deja un comentario sobre la vendedora
                  input.form__textarea.form__textarea_height(
                  id='CommentSale'
                  maxlength='340')
                button.btn.i-send Comentar
            //-1_2g
            //- Flujo desde => Calificación
            .dashboard__actions
              p.status.status_check.i-check Compra finalizada y calificada
      .dashboard__item
        .dashboard__data
          p.dashboard__high Número de Orden: 12384746
          p 21/9/2017
        .dashboard__grid
          .dashboard__subitem
            article.list__card
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
                    p.card__size Talla: S
                  p.card__price $ 21.000
                  .card__user-data
                    p Compradora: Daniela Villanueva
                    p Teléfono: 97736545
                    p Dirección: Av. Pajaritos 1309, maipu

          .dashboard__subitem
            //-2
            .dashboard__status
              p.status.status_check.i-check Compra confirmada y pago recibido
              p.status.status_warning.i-reload A la espera de envío
              p Tu pedido está en proceso de empaque y envío por parte de la vendedora.

      .dashboard__item
        .dashboard__data
          p.dashboard__high Número de Orden: 12384746
          p 21/9/2017
        .dashboard__grid
          .dashboard__subitem
            article.list__card
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
                    p.card__size Talla: S
                  p.card__price $ 21.000
                  .card__user-data
                    p Compradora: Daniela Villanueva
                    p Teléfono: 97736545
                    p Dirección: Av. Pajaritos 1309, maipu

          .dashboard__subitem
            //-3
            .dashboard__status
              p.status.status_check.i-check Compra confirmada y pago recibido
              p.status.status_check.i-check Enviado
              p Nº de seguimiento: 00123123123
              p Empresa de mensajería: Chile Express
              a.link_underline(href='#') ¿Dónde está mi paquete?
            .dashboard__actions
              p ¿Ya recibiste este producto?
              a.btn.btn_solid.btn_block(
                href='#') Si, Recibí y me lo quedo
              a.link_underline(
                href='#') ¿Algo no te gustó de tu producto?
            //-3_2a
            //- Flujo desde btn => ¿Algo no te gustó de tu producto?
            .dashboard__actions
              .dashboard__actions
                p Ya no puedes devolver este producto.
                //-Notificaciones
                .user-data__notify
                  ul.user-data__list
                    li.user-data__value.i-like 20
                    li.user-data__value.i-like.i_flip 0
                    li.user-data__value.i-less-circle 0
                .form.dashboard__form
                  .form__row
                    label.form__label(
                      for='CommentSale') Deja un comentario sobre la vendedora
                    input.form__textarea.form__textarea_height(
                      id='CommentSale'
                      maxlength='340')
                  button.btn.i-send Comentar
            //-3_2b
            //- Flujo desde btn => ¿Algo no te gustó de tu producto?
            .dashboard__actions
              p.status.status_check.i-check Compra confirmada y pago recibido
              p ¿Quieres devolver este producto a la vendedora?
              a.link_underline.link_underline_lower(
                href='#') Pensándolo bien, me lo quedo.
              a.btn.btn_solid.btn_block(
                href='#') Estoy segura de devolverlo
              p (Tienes 20h 12m para devolverlo)
            //-3_2c
            //- Flujo desde btn => Estoy segura de devolverlo
            .dashboard__actions
              p.dashboard__lead Cuéntanos los motivos de la devolución.
              ul.dashboard__list
                li.dashboard__check
                  input.form__input-check(
                  type="checkbox"
                  name="returncheck"
                  id="returncheck1"
                  value="returncheck1")
                  label.form__label_check.i-ok(
                    for="returncheck1") Chaqueta Zara Mostaza
                li.dashboard__check
                  input.form__input-check(
                  type="checkbox"
                  name="returncheck"
                  id="returncheck2"
                  value="returncheck2")
                  label.form__label_check.i-ok(
                    for="returncheck2") Pantalón para deporte azul
                li.dashboard__check
                  input.form__input-check(
                  type="checkbox"
                  name="returncheck"
                  id="returncheck3"
                  value="returncheck3")
                  label.form__label_check.i-ok(
                    for="returncheck3") Pijama de ovejitas
              a.link_underline.link_underline_lower(
                href='#') Pensándolo bien, me lo quedo.
              a.btn.btn_solid.btn_block(
                href='#') Estoy segura de devolverlo
              p (Tienes 20h 12m para devolverlo)
            .dashboard__actions
              p.dashboard__lead Cuéntanos los motivos de la devolución.
              ul.dashboard__list
                li.dashboard__check
                  input.form__input-radio(
                    type="radio"
                    name="return"
                    id="return1"
                    value="return1")
                  label.form__label_radio(
                    for="return1") El producto era diferente a la descripción o las fotos.
                li.dashboard__check
                  input.form__input-radio(
                    type="radio"
                    name="return"
                    id="return2"
                    value="return2")
                  label.form__label_radio(
                    for="return2") No me siento a gusto con la talla o el color.
                li.dashboard__check
                  input.form__input-radio(
                    type="radio"
                    name="return"
                    id="return3"
                    value="return3")
                  label.form__label_radio(
                    for="return3") Las condiciones del producto no son las que esperaba.
                li.dashboard__check
                  input.form__input-radio(
                    type="radio"
                    name="return"
                    id="return4"
                    value="return4")
                  label.form__label_radio(
                    for="return4") Otro motivo.

              a.btn.btn_solid.btn_block(
              href='#') Continuar
              a.link_underline.link_underline_lower(
              href='#') Pensándolo bien, me lo quedo.
            //-3_2e
            //- Flujo desde btn => Devolver
            .dashboard__actions
              p.status.status_warning.i-reload A la espera de que devuelvas el producto
              p Tienes 4 días 23 horas para confirmar el envío y colocar el número de seguimiento
              form.form.dashboard__form(
                v-on:submit='',
                action='#',
                method='post'
              )
                .form__row
                  label.form__label(
                    for='getName') Ingresa el nombre de la empresa de mensajería
                  input.form__control(
                    id='getName',
                    type='text'
                  )
                .form__row
                  label.form__label(
                    for='getNumber') Ingresa el número de seguimiento.
                  input.form__control(
                    id='getNumber',
                    type='text'
                  )
                .form__row
                  button.btn.btn_solid Enviar número de seguimiento
              .break
                span.break__txt O
              a.link_underline(
              href='#') Acordar juntarme con la vendedora
            //-3_2f
            //- Flujo desde btn => Enviar número de seguimiento
            .dashboard__actions
              p.status.status_warning.i-reload Esperando confirmación de recibido de la Vendedora.
              p Ya nos informaste que devolviste el pedido:
              p Empresa: Correos de Chile
              p Número de Seguimiento: AS123102931203
              p Estamos esperando que la vendedora nos confirme que recibió la devolución.
              a.link_underline(
                href='#') « Ingresé mal el número de seguimiento o devolví de otra forma
            //-3_2g
            //- Flujo de Esperando confirmación de recibido de la Vendedora.
            .dashboard__actions
              p.status.status_alert.i-reload Pedido devuelto.
            //-3_2h
            //- Flujo desde btn => Acordar juntarme con la vendedora
            .dashboard__actions
              p.status.status_warning.i-reload Esperando confirmación de recibido de la Vendedora.
              p Escogiste juntarte con la vendedora. Estamos esperando que ella nos confirme que ya le entregaste el pedido.
              a.link_underline(
                href='#') Escribir a la vendedora
              .break
                span.break__txt O
              a.link_underline(
                href='#') « Lo entregué de otra forma
</template>

<script src="./js/UserTusCompras.js"></script>
