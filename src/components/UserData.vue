<template lang="pug">
section.single
  //- <pre>{{ $data.user.addresses }}</pre>
  .single__inner
    //- User Profile
    header.single__header
      h1.single__title Datos Personales
    //- TO-DO:
    //- Clic BTN editar Se activan los campos de :
        nombre, biografía, direcciones, correo.
        teléfono. Para ser modificados por el usuario.
        Aparece un  boton para guardar los cambios realizados.
        Wireframe 1b

    //- data User
    .user-data(
      v-for="data in user")
      //-TO-DO if AUTH datos dinámicos USER
      form.form(
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
            h2.user-data__title
              | {{ data.first_name }} {{ data.last_name }}
            .user-data__notify
              ul.user-data__list
                li.user-data__value.i-like 20
                li.user-data__value.i-like.i_flip 0
                li.user-data__value.i-less 0
              ul.user-data__list
                li.user-data__track {{ data.followers_count }} Seguidores
                li.user-data__track {{ data.following_count }} Siguiendo
        .user-data__actions
          a.btn.btn_small.i-start-line(
            href="#",
            title="Ser Priloverstar") Ser Prilovestar

        .user-data_info
          h3.subhead Direcciones
          ul.dividers
            li.dividers__item(
              v-for="(addressList, index) in data.addresses")
              span.dividers__edit.i-edit {{ addressList.address }},  {{ addressList.region }},  {{ addressList.zone }}
              span.dividers__select.i-heart-on(
                @click="UserNewAddress = true") <small class="hide" >Seleccionar</small>

            //- clic "nueva dirección"
              Se despliega un cuadro con los inputs de:
              Dirección, Número, Dpto/villa/block,
              región, ciudad y comuna.
              Con las acciones de "agregar nueva direccion" o "cancelar".
              Wireframe 1c
              Bloque Editar Direcciones Perfil de usuaria
              1. Aparece un listado de direcciones (Si tiene más de una)
              con una marcada como favorita por medio de una estrella.
              2. El usuario puede cambiar su dirección
              predeterminada eligiendo una nueva favorita,
              editando o agregando una nueva dirección.
              3. Para cambiar la dirección favorita sólo debe
              seleccionar la estrella de otra dirección.
              En mobile solo se selecciona la dirección
              y esta cambiará de color.
              4. Si quiere agregar una nueva dirección
              el usuario deberá seleccionar esta opción
              y llenar el formulario.
              5. Si decide editarla, debe seleccionar el ícono de edición
              y cambiar la información que desee en el formulario.
              6. Para eliminar la dirección debe seleccionar
              el ícono de edición y la opción eliminar."
            li.dividers__bottom(
              v-if="newAddress == false")
              span.dividers__plus.i-plus(
                @click="NewAddress()") Nueva dirección

          .user-data__form(
            v-if="newAddress == true")
              fieldset.form__set
                legend.form__legend Nueva dirección
                .form__grid
                  .form__row
                    label.form__label(
                      for='userAddress') Dirección
                    input.form__control(
                      id='userAddress',
                      type='text',
                      v-model="data.addresses.address")
                  //- .form__row
                  //-   label.form__label(
                  //-     for='addressNumber') Número
                  //-   input.form__control(
                  //-     id='addressNumber',
                  //-     type='text',
                  //-     placeholder="")
                  .form__row
                    label.form__label(
                      for='addressDepto') Depto/Villa/block
                    input.form__control(
                      id='addressDepto',
                      type='text',
                      v-model="data.addresses.region")
                  .form__row
                    label.form__label(
                      for='addressCity') Ciudad
                    input.form__control(
                      id='addressCity',
                      type='text',
                      v-model="data.addresses.zone")
                //- .form__grid
                //-   .form__row
                //-     label.form__label(
                //-       for='addressCity') Ciudad
                //-     input.form__control(
                //-       id='addressCity',
                //-       type='text')
                //-   .form__row
                //-     label.form__label(
                //-       for='addressRegion') Región
                //-     input.form__control(
                //-       v-model='addressRegion',
                //-       id='addressRegion',
                //-       type='text')
                //-   .form__row
                //-     label.form__label(
                //-       for='addressComuna') Comuna
                //-     input.form__control(
                //-       id='addressComuna',
                //-       type='text')
                .form__grid.form__grid_center.form__row_away
                  .form__row
                    span.btn(
                      @click="NewAddress()") Cancelar
                  .form__row
                    span.btn.btn_solid(
                      @click="AddAddress()") Agregar nueva dirección

          //- Bloque Editar Correo Perfil de usuaria
            1. Se debe seleccionar el ícono de editar
            y el correo se convierte en un campo de
            formulario que se puede editar. Luego se da guardar.
            2. Se debe confirmar el nuevo correo para que este
            cambio sea validado. (Ver Formulario de Registro paso 5)

          .dividers
            label.subhead.dividers__title(
            for='editEmail') Correo
            .dividers__item.dividers__edit.i-edit(
                :class="{'dividers__edit_active' :editedEmail == true}")
              input.form__edit(
                v-model='data.email',
                id='editEmail',
                type='email',
                :placeholder="data.email",
                @change="EditEmail()",
                @input="EditEmail()")

          //- Bloque Editar Teléfono Perfil de usuaria
            1. Selecciona el ícono de edición frente al
            teléfono y edita el número en el campo de formulario.
          .dividers
            label.subhead.dividers__title(
            for='editPhone') Teléfono
            .dividers__item.dividers__edit.i-edit(
              :class="{'dividers__edit_active' :editedTel == true}")
              input.form__edit(
                v-model='data.phone',
                id='editPhone',
                type='tel',
                :placeholder="data.phone",
                @change="EditTel()",
                @input="EditTel()")

          .form__grid.form__grid_center.form__row_away(
            v-if="editedUser == false")
            .form__row
              span.btn.i-edit(
                title="Editar Perfil",
                @click="EditUser()") Editar Perfil
          .form__grid.form__grid_center.form__row_away(
            v-else="")
            .form__row
              span.btn(
                @click="EditCancel()") Cancelar
            .form__row
              buttom.btn.btn_solid Guardar
</template>

<script>
export default {
  name: 'UserData',
  data () {
    return {
      selectAddress: '',
      newAddress: false,
      editedEmail: false,
      editedTel: false,
      editedUser: false,
      editedProfile: false,
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
              zone: 'Santiago'
            },
            {
              id: '4',
              address: 'Los flamencos 1300',
              region: 'Mapú',
              zone: 'Santiago'
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
    NewAddress: function () {
      this.newAddress = !this.newAddress
    },
    AddAddress: function () {
      this.user.push({
        addresses: ({
          address: '',
          region: '',
          zone: ''
        })
      })
    },
    EditEmail: function () {
      this.editedEmail = true
      this.editedUser = true
    },
    EditTel: function () {
      this.editedTel = true
      this.editedUser = true
    },
    EditUser: function () {
      // btn send mail|tel|address|name
      this.editedUser = true
      // btn edit img|cover|description
      // active btn pass|delete
      this.editedProfile = true
    },
    EditCancel: function () {
      // cierrra todo
      this.newAddress = false
      this.editedEmail = false
      this.editedTel = false
      this.editedUser = false
      this.editedProfile = false
    }
  }
}
</script>
