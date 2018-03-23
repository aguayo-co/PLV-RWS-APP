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
  //-
  .layout-inner
    section.list
      h2.subhead Hay 3 Productos en tu carro de Compras
      .list__grid
        .list__content
          article.list__card
            router-link.card__product(
              to="#",
              title="")
              .card__figure
                img.card__img(
                  src="/static/img/demo/product-001.jpg",
                  alt="")

              //-title/dimensions
              .card__info
                .card__header
                  h3.card__title Blusa Blanca Forever 21
                  p.card__brand Marca: Forever 21
                  p.card__size Talla: S
                p.card__price $ 21.000
                p.card__tag.tag Prenda usada
            .card__column
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
              .card__actions
                a.btn.i-trash(
                  title="Eliminar producto del listado",
                  href="#") Eliminar producto
        .list__side
</template>

<script>
export default {
  name: 'Compra'
}
</script>
