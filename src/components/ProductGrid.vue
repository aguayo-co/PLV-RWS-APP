<template lang="pug">
  //- slot producto Grilla
  //- Description:
    Imagen aspect ratio: 2: 3
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
  .product-grid
    //-- TO-DO: consumir servicios
    article.slot.slot_grid(
      v-for='product in products')
      //-- a.slot__ico(
        :href='product.add'
        :title='product.icotitle') {{product.icotext}}
      a.slot__ico.i-heart(
        @click='myActive'
        :class='{active: isActive}'
        href='#'
        title='Agrega a Favoritos') Agregar a Favoritos
      a.slot__product(
        :href='product.url',
        :title='product.title')
        img.slot__img(
          :src="product.file",
          alt="product.title")

        //-title/dimensions
        .slot__lead
          .slot__title {{ product.title }}
          .slot__size
            .slot__size-txt {{ product.dimensions }}

        //- brand/price
        .slot__info
          .slot__brand {{ product.brand }}
          .slot__price ${{ product.price }}

      //- user: picture/first_name/last_name
      a.slot__user(
        :href='user',
        :title='product.first_name')
        .slot__user-img
          .slot__avatar
            img.slot__picture(
              :src="product.picture",
              :alt="product.first_name")
        .slot__user-info
          .slot__prilover {{ product.first_name }} {{ product.last_name }}
          .slot__group.i-it-girl(
            v-if='product.slot__group == 1') It <span class="txt_brand">girl</span>
          .slot__group.i-starts(
            v-if='product.slot__group == 2') Prilover <span class="txt_brand">Star</span>

</template>

<script>

export default {
  name: 'ProductGrid',
  data () {
    return {
      isActive: false,
      products: [
        {
          url: '/',
          title: 'Blusa Rayas',
          dimensions: 'm',
          brand: 'Nicopoly',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-001.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-009.jpg',
          first_name: 'Mariana',
          last_name: 'Gómez',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Chaqueta Mostaza',
          dimensions: 's',
          brand: 'Rubinella',
          price: '16.000',
          status_id: '',
          file: '/static/img/demo/product-002.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-007.jpg',
          first_name: 'Juliana',
          last_name: 'Rocha',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Vestido Maaji',
          dimensions: 's',
          brand: 'Maaji',
          price: '50.000',
          status_id: '',
          file: '/static/img/demo/product-003.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-005.jpg',
          first_name: 'Vale',
          last_name: 'Caballero',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Sandalias de Cuero y Tachas Saville Row',
          dimensions: 'xs',
          brand: 'Straadivaruois & Zara Home Juntos',
          price: '40.000',
          status_id: '',
          file: '/static/img/demo/product-004.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-003.jpg',
          first_name: 'Genevieve',
          last_name: 'Gibson',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Chaqueta Ecocuero Dorada',
          dimensions: 'm',
          brand: 'Soviet',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-005.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-001.jpg',
          first_name: 'Giovanna',
          last_name: 'Bustos',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Jeans Ripped',
          dimensions: '40',
          brand: 'Zara',
          price: '14.000',
          status_id: '',
          file: '/static/img/demo/product-006.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-002.jpg',
          first_name: 'Dani',
          last_name: 'Herzko',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Chaqueta Ecocuero Negra',
          dimensions: 's',
          brand: 'Forever 21 ',
          price: '15.000',
          status_id: '',
          file: '/static/img/demo/product-007.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-004.jpg',
          first_name: 'Trini',
          last_name: 'Garcés ',
          slot__group: '1'
        },
        {
          url: '/',
          title: 'Blazer Rojo',
          dimensions: '46',
          brand: 'Desconocida',
          price: '8.000',
          status_id: '',
          file: '/static/img/demo/product-008.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-006.jpg',
          first_name: 'Loreto',
          last_name: '',
          slot__group: '2'
        },
        {
          url: '/',
          title: 'Blusa H&M Studio',
          dimensions: 's',
          brand: 'H&M ',
          price: '12.000',
          status_id: '',
          file: '/static/img/demo/product-009.jpg',
          user: '/',
          picture: '/static/img/demo/user-avatar-008.jpg',
          first_name: 'Isi',
          last_name: 'Fierro',
          slot__group: '2'
        }
      ]
    }
  },
  methods: {
    myActive: function (e) {
      this.isActive = !this.isActive
      e.preventDefault()
    }
  }
}
</script>
