<template lang="pug">
.layout-inner
  section.single
    .single__inner
      //- User Profile
      header.single__header
        h2.subhead Sobre la vendedora
      //- data User
      .user-data.user-card
        .user-card__block
          .user-header
            .user-header__item
              .user-data__avatar
                //- clic en foto de perfil de usuario
                  Se despliega un input (file) donde el usuario
                  puede subir y editar su foto de perfil.
                img.user-data__img(
                  :src="user.picture",
                  :alt="'Perfil' + ' ' + user.first_name")
              p.user-data__caption-i.i-star-on Prilovestar
            .user-header__item
              .user-header-edit(
                :class="{'user-header-edit_active' :editName == true}")
                a.user-header-edit__item(
                  href="#",
                  title="Editar Nombre y apellido")
                  h3.user-data__title
                    | {{ user.first_name }} {{ user.last_name }}
              .user-data__notify
                ul.user-data__list
                  li.user-data__value.i-like 20
                  li.user-data__value.i-like.i_flip 0
                  li.user-data__value.i-less-circle 0
                ul.user-data__list
                  li.user-data__track {{ user.followers_count }} Seguidores
                  li.user-data__track {{ user.following_count }} Siguiendo
        .user-card__block
          .user-bullet
            p.user-bullet__txt {{ user.about }}
            a(href='/' title='Enviar mensaje privado').user-bullet__link.i-email Enviar mensaje privado
</template>
<script>

export default {
  name: 'ProductUser',
  props: ['user'],
  data () {
    return {
      isActive: '',
      selectAddress: '',
      newAddress: false,
      editName: false,
      editAbout: false,
      editEmail: false,
      editTel: false
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
