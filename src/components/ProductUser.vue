<template lang="pug">
  section.single
    .single__inner
      //- User Profile
      header.single__header
        h2.subhead Sobre la vendedora
      //- data User
      .user-data(
        v-for="data in user")
        //-TO-DO if AUTH datos dinámicos USER
        form.form(
          id="form-user-data"
          v-on:submit='',
          action='#',
          method='post')
          .user-header
            .user-header__item

              .user-data__avatar
                //- clic en foto de perfil de usuario
                  Se despliega un input (file) donde el usuario
                  puede subir y editar su foto de perfil.
                img.user-data__img(
                  :src="data.picture",
                  :alt="'Perfil' + ' ' + data.first_name")
            .user-header__item
              .user-header-edit(
                :class="{'user-header-edit_active' :editName == true}")
                a.user-header-edit__item(
                  @click.prevent="EditName()",
                  href="#",
                  title="Editar Nombre y apellido")
                  h3.user-data__title
                    | {{ data.first_name }} {{ data.last_name }}
                  span.user-edit__actions
                    span.btn_edit.i-edit-line <small class="hide"> Editar </small>
                //-TO-do animate slide
                transition(slide-toggle)
                  .user-header-edit__grid(
                    v-show="editName == true")
                    .form__row
                      label.form__label(
                        for='nombre') Editar Nombre
                      input.form__edit(
                        v-model='data.first_name',
                        id='username'
                      )
                    .form__row
                      label.form__label(
                        for='apellidos') Editar Apellidos
                      input.form__edit(
                        v-model='data.last_name',
                        id='userLast',
                        type='text'
                      )

              //-Enlaces Modal
              //- ul.user-data-nav
              //-   li.user-data-nav__item Cambiar contraseña   |
              //-   li.user-data-nav__item Eliminar cuenta
              //-Notificaciones
              .user-data__notify
                ul.user-data__list
                  li.user-data__value.i-like 20
                  li.user-data__value.i-like.i_flip 0
                  li.user-data__value.i-less-circle 0
                ul.user-data__list
                  li.user-data__track {{ data.followers_count }} Seguidores
                  li.user-data__track {{ data.following_count }} Siguiendo

          //-editar About perfil
          .user-header-edit
            .user-header-edit__item.edit__item_top
              .form__row_top
                p.user-data__txt(
                  v-if="editAbout == false",
                  @click.prevent="EditAbout()") {{ data.about }}
                textarea.form__edit_txt(
                  v-model="data.about",
                  name="about",
                  maxlength="340",
                  v-if="editAbout == true",
                  form="form-user-data")
              a.user-edit__actions(
                @click.prevent="EditAbout()",
                href="#"
                title="Editar perfil")
                span.btn_edit.i-edit-line <small class="hide"> Editar </small>
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
