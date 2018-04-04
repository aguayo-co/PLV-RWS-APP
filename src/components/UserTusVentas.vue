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
            //-2
            p ¿Cómo entregaste este pedido?
            a.link_underline(
                href="#") Nos juntamos
            a.link_underline(
                href="#") Usé una empresa de mensajería
            //-2b
            Ingresa el nombre de la empresa de mensajerí
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
