<template lang="pug">
  //- slot producto
  //- Description:
    Imagen aspect ratio: 2 : 3
    1. lista de 9 productos bajo un criterio
    de ordenamiento determinado.
    2. Cuando un usuario (logueado) da clic en el corazón,
    este ícono se anima llenándose de color y el producto
    se agrega a la lista de favoritos de la usuaria.
    3. Si el usuario no está logueado el sistema lo invita
    a loguearse abriendo el pop up del login.
    Si el usuario no tiene cuenta se abre el flujo de registro.
    Al terminar este proceso el producto se agrega
    a sus favoritos (Vuelve al paso anterior).
    4. Cada producto tiene dos áreas cliqueables:
      - Va desde la parte superior de la fotografía del producto
        hasta el precio del mismo, al hacer clic en esta área
        se lleva al usuario a la página del producto.
      - Es la caja que contiene la fotografía y
        el nombre de la prilover, al dar clic en esta área
        se lleva al usuario al perfil de la prilover.
    5. Al oprimir el botón 'Ver más productos'
    se cargan 9 productos empujando esté botón
    y el footer hacia abajo.
    6. La función en mobile carga automáticamente estos
    9 items cuando el usuario se acerca al final de la grilla.
    7. EN MOBBILE No existe botón 'ver más productos'

  //-- TO-DO: consumir servicios
  article.slot.slot_grid
    a.slot__product(
      href='products.url',
      title='Url Producto')
      img.slot__img(
        src="/static/img/demo/product-001.jpg",
        alt="")

      //-title/dimensions
      .slot__lead
        .slot__title Sandalias de Cuero y Tachas Saville Row
        .slot__size
          .slot__size-txt xs

      //- brand/price
      .slot__info
        .slot__brand Straadivaruois & Zara Home Juntos
        .slot__price $40.000

    //- user: picture/first_name/last_name
    a.slot__user(
      href='user.url',
      title='Url Perfil User')
      .slot__user-img
        .slot__avatar
          img.slot__picture(
            src="/static/img/demo/user-avatar.jpg",
            alt="")
      .slot__user-info
        .slot__prilover Genevieve Gibson
        .slot__group It <span class="txt_brand">girl</span>
</template>

<script>

export default {
  name: 'ProductSlot'
}
</script>
