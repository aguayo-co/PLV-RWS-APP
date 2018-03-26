<template lang="pug">
//-Compra Listado de productos: 1a Cliente Registrado, logueado
section.list_step
  h2.subhead Hay 3 Productos en tu carro de Compras
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

    //-info User / btn eliminar
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

      //-btn eliminar
      .card__actions
        a.card__btn.btn.i-trash(
          title="Eliminar producto del listado",
          href="#") Eliminar producto
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

    //-info User / btn eliminar
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

      //-btn eliminar
      .card__actions
        a.card__btn.btn.i-trash(
          title="Eliminar producto del listado",
          href="#") Eliminar producto
  //-End Item 2
//End Compra Listado productos
</template>

<script>
export default {
  name: 'CompraCarro'
}
</script>
