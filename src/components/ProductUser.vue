<template lang="pug">
  section.single
    .single__inner
      //- User Profile
      header.single__header
        h2.subhead Sobre la vendedora
      //- data User
      .user-data.user-card(
        v-for="data in user")
        .user-card__block
          .user-header
            .user-header__item
              .user-data__avatar
                //- clic en foto de perfil de usuario
                  Se despliega un input (file) donde el usuario
                  puede subir y editar su foto de perfil.
                img.user-data__img(
                  :src="data.picture",
                  :alt="'Perfil' + ' ' + data.first_name")
              p.user-data__caption-i.i-star-on Prilovestar
            .user-header__item
              .user-header-edit(
                :class="{'user-header-edit_active' :editName == true}")
                a.user-header-edit__item(
                  href="#",
                  title="Editar Nombre y apellido")
                  h3.user-data__title
                    | {{ data.first_name }} {{ data.last_name }}
              .user-data__notify
                ul.user-data__list
                  li.user-data__value.i-like 20
                  li.user-data__value.i-like.i_flip 0
                  li.user-data__value.i-less-circle 0
                ul.user-data__list
                  li.user-data__track {{ data.followers_count }} Seguidores
                  li.user-data__track {{ data.following_count }} Siguiendo
        .user-card__block
          .user-bullet
            p.user-bullet__txt Compradora compulsiva en rehabilitación, todo lo que ves en mi perfil está disponible y en excelente estado. Todas las ventas se hacen por Prilov.
            a(href='/' title='Enviar mensaje privado').user-bullet__link.i-email Enviar mensaje privado
</template>

<script>
export default {
  name: 'product-user',
  data () {
    return {
      isActive: '',
      selectAddress: '',
      newAddress: false,
      editName: false,
      editAbout: false,
      editEmail: false,
      editTel: false,
      user: [
        {
          id: '1',
          email: 'dabe.neleb@gmail.com',
          first_name: 'Damarys',
          last_name: 'Saldaña',
          about: 'Co-Founder at Prilov.com. Llegué a Santiago luego de vivir en Londres por algunos años y volví llena de ropa que no cabe en mi clóset. Acá encuentran todo lo que ya no uso. Entrego en metro Escuela Militar y Los Dominicos. Envíos son por pagar por Correos',
          phone: '+56 9 74783147',
          cover: '/static/img/demo/user-cover.jpg',
          picture: '/static/img/demo/user-avatar.jpg',
          favorite_address_id: '2',
          addresses: [
            {
              id: '2',
              address: 'Alberto Blest Gana 803',
              region: 'Padre Hurtado',
              city: 'Santiago',
              zone: ''
            },
            {
              id: '3',
              address: 'Pasaje la Lenga  1539',
              region: 'Cerro Navia',
              city: 'Santiago',
              zone: ''
            },
            {
              id: '4',
              address: 'Los flamencos 1300',
              region: 'Mapú',
              city: 'Santiago',
              zone: ''
            }
          ],
          group_ids: [1],
          group: [
            {
              id: 1,
              name: 'Prilover Star'
            }
          ],
          followers_count: '349',
          following_count: '4'
        }
      ]
    }
  },

  methods: {
    IsActive: function (e) {
      this.isActive = e
    },
    NotActive: function (e) {
      this.isActive = ''
    },
    EditName: function () {
      this.editName = !this.editName
    },
    EditAbout: function () {
      this.editAbout = !this.editAbout
    },
    NewAddress: function () {
      this.newAddress = !this.newAddress
    },
    EditEmail: function () {
      this.editEmail = !this.editEmail
    },
    EditTel: function () {
      this.editTel = !this.editTel
    }
  }
}
</script>
