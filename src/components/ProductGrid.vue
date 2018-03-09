<template lang="pug">
  //- slot producto Grilla
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

  .layout-inner
    .product-section
      .product-grid
        ProductSlot
        ProductSlot
        ProductSlot
</template>

<script>
import ProductSlot from '@/components/ProductSlot'

export default {
  name: 'ProductGrid',
  components: {
    ProductSlot
  }
}
</script>
