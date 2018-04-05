<template lang="pug">
section.single
  .single__inner
    header.single__header
      h1.single__title Tus Ventas
    //componente acciones filtro
    .user__actions
      router-link.btn(
        to="/publicar-venta"
      ) Publicar un Producto
      router-link.btn(
        to="/publicar-pack"
      ) Crear Pack
      .form__row
        .form__select
        .toggle-select
          ul.toggle-select__list
            li.toggle-select__item Todas
            li.toggle-select__item Pendientes de envío
            li.toggle-select__item Pendientes de pago
    //componente tabla
    .dashboard
      header.dashboard__head
        h2.dashboard__title Productos
        h3.dashboard__title Estado del pedido
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
              p.status.status_check.i-check Pedido Pagado sin Envío
              p.status.status_alert.i-alert-circle Pendiente de entrega acordada con compradora
            .dashboard__actions
              p ¿Ya te juntaste o lo enviaste por pagar?
              a.btn.btn_solid.btn_block(
                href="#") Si, ya lo entregué.
              a.link_underline(
                href="#") Escribir a la compradora
            //-1_2
            //- Flujo desde btn => Sí ya lo entregué
            .dashboard__actions
              p ¿Cómo entregaste este pedido?
              span.dashboard__actions_link
                a.link_underline(
                href="#") Nos juntamos
              a.link_underline(
              href="#") Usé una empresa de mensajería
            //-1_2a
            //- Flujo desde btn => Nos juntamos
            .dashboard__actions
              p.status.status_alert.i-rocket Esperando confirmación de recibido de la Compradora.
              p Escogiste juntarte con la vendedora.
              p Estamos esperando que ella nos confirme que ya le entregaste el pedido.
              a.link_underline(
              href="#") Lo entregué de otra forma
            //-1_2b
            //- Flujo desde btn => Usé una empresa de mensajería
            .dashboard__actions
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
            //-1_2c
            //- Flujo desde btn de form => Enviar número de seguimiento
            .dashboard__actions
              p.status.status_alert.i-rocket Esperando confirmación de recibido de la Compradora.
              p Ya nos informaste que enviaste el pedido,
              p Empresa:
                span  Correos de Chile
              p Número de Seguimiento:
                span  AS123102931203
              p Estamos esperando que la compradora nos confirme que recibió el pedido.
              a.link_underline(
              href="#") « Ingresé mal el número de seguimiento o entregué de otra forma
            //-1_2d
            //- Flujo desde => Esperando confirmación
            .dashboard__actions
              p Califica esta compra
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
              p.status.status_check.i-check Pedido Pagado
              p.status.status_alert.i-alert-circle Pendiente de envío con ChileExpress
            //- 2b
            .dashboard__actions
              p ¿Ya imprimiste la etiqueta y enviaste el producto?
              a.btn.btn_solid.btn_block(
                href="#") Si, ya lo envié.
              a.link_underline(
                href="#") Reimprimir etiqueta de ChileExpress
            //-2_2b
            //- Flujo desde btn => Si, ya lo envié.
            .dashboard__actions
              form.form.dashboard__form(
                v-on:submit='',
                action='#',
                method='post'
              )
                .form__row
                  label.form__label(
                    for='numTracing') Ingresa el Nº de seguimiento de ChileExpress
                  input.form__control(
                    id='numTracing',
                    type='text'
                  )
                .form__row
                  button.btn.btn_solid Enviar número de seguimiento
            //-2_2c
            //- Flujo desde btn de form => Enviar número de seguimiento
            .dashboard__actions
              p.status.status_check.i-rocket Pedido Enviado por ChileExpress # de seguimiento: 991238891238FR
              p Ya nos informaste el número de seguimiento y se lo enviamos a la vendedora.
              a.link_underline(
              href="#") « Ingresé mal el número de seguimiento o entregué de otra forma
            //-2_2d
            //- Flujo desde => Pedido Enviado por ChileExpress
            .dashboard__actions
              p.status.status_check.i-check Pedido recibido por la vendedora.

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
              p.status.status_alert.i-rocket A la espera de envío
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
            //-4
            .dashboard__status
              p.status.status_alert.i-alert-circle Pendiente de pago
              p Estamos confirmando el pago de este pedido por parte de la compradora.
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
            //-5
            .dashboard__status
              p.status.status_warning.i-reload Pedido en proceso de devolución
              p La compradora decidió devolver este producto y está en proceso de enviártelo de vuelta.
            //-5b
            .dashboard__actions
              p ¿Ya recibiste la devolución?
              a.btn.btn_solid.btn_block(
              href='#') Si, la recibí
            //-5_2b
            //- Flujo desde btn => Si, la recibí.
            .dashboard__actions
              p ¿Cómo recibiste el producto?
              a.btn.btn_block(
              href='#') Lo recibí bien
              a.btn.btn_block(
              href='#') Lo recibí en peores condiciones
            //-5_2c
            //- Flujo desde btn => Lo recibí bien
            .dashboard__actions
              p.status.status_warning.i-reload Pedido devuelto
            //-5_2d
            //- Flujo desde btn => Lo recibí en peores condiciones
            .dashboard__actions
              p ¿Por qué lo recibiste en peores condiciones?
            //-5_2e
            //- Flujo desde btn => Informar a Prilov
            .dashboard__actions
              p.status.status_warning.i-reload Pedido devuelto en revisión por Prilov
              p Nos informaste de una inconformidad en el pedido que te devolvieron y lo estamos evaluando.
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
            //-6
            .dashboard__status
              p.status.status_check.i-check Pedido Enviado
</template>

<script>
export default {
  name: 'UserTusVentas'
}
</script>
