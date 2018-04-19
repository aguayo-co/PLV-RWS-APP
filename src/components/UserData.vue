<template lang="pug">
section.single
  .single__inner
    //- User Profile
    header.single__header
      h1.single__title Datos Personales

    //- data User
    .user-data
      .user-over(
        :class="{'user-avatar_active' :editPicture == true}")
        .user-header
          .user-header__item
            .user-avatar-edit
              span.user-edit__actions
                span.btn_edit.i-edit-line(
                  @click.prevent="toggle('editPicture')") <small class="hide"> Editar </small>
              .user-data__avatar
                //- clic en foto de perfil de usuario
                  Se despliega un input (file) donde el usuario
                  puede subir y editar su foto de perfil.
                img.user-data__img(
                  v-if="picture"
                  :src="picture",
                  :alt="'Perfil' + ' ' + first_name")
                span.tool-user__letter(
                  v-else
                ) {{ new_first_name.charAt(0) }}
            form.form_user.user-avatar__upfile(
              id="form-user-avatar"
              v-on:submit.prevent='',
              v-show="editPicture == true")
              .upfile__small
                p.form__label Foto de perfil
                .upfile__item
                  .upfile__label
                    .upfile__text.i-upload(
                      v-if="mqDesk") Arrastra una foto o
                    .upfile__btn Sube una imagen
                  span.help(
                    v-show="errorLog.picture") {{ errorLog.picture }}
                  croppa(
                    :width="300",
                    :height="300",
                    :quality="2",
                    placeholder="",
                    :prevent-white-space="true"
                    v-model="new_picture")
                .user-edit__save(
                  @click="updatePicture"
                )
                    button.btn-tag Guardar
          .user-header__item
            .user-header-edit(
              :class="{'user-header-edit_active' :editName == true}")
              a.user-header-edit__item(
                @click.prevent="toggle('editName')",
                href="#",
                title="Editar Nombre y apellido")
                h3.user-data__title
                  | {{ full_name }}
                span.user-edit__actions
                  span.btn_edit.i-edit-line <small class="hide"> Editar </small>

              form.form_user.user-header-edit__grid(
                id="form-user-name"
                v-on:submit.prevent='updateName',
                v-show="editName == true")
                .form__row
                  label.form__label(
                    for='nombre') Editar Nombre
                  span.help(
                    v-show="errorLog.first_name") {{ errorLog.first_name }}
                  input.form__edit(
                    v-model='new_first_name',
                    id='username'
                  )
                .form__row
                  label.form__label(
                    for='apellidos') Editar Apellidos
                  span.help(
                    v-show="errorLog.last_name") {{ errorLog.last_name }}
                  input.form__edit(
                    v-model='new_last_name',
                    id='userLast',
                    type='text'
                  )
                .form__row.user-edit__save
                  button.btn-tag Guardar
            //-Enlaces Modal
            ul.user-data-nav
              li.user-data-nav__item
                a.btn-tag(@click.prevent="changePassword") Cambiar contraseña
              li.user-data-nav__item
                a.btn-tag Eliminar cuenta
            //-Notificaciones
            .user-data__notify
              ul.user-data__list
                li.user-data__value.i-like 20
                li.user-data__value.i-like.i_flip 0
                li.user-data__value.i-less-circle 0
              ul.user-data__list
                li.user-data__track {{ followers_count }} Seguidores
                li.user-data__track {{ following_count }} Siguiendo
        //-editar About perfil
        .user-header-edit
          .user-header-edit__item.edit__item_top
            .user-data__box-txt(
              v-if="editAbout == false",
              @click.prevent="toggle('editAbout')")
              p.user-data__txt(
                v-if="about == null")
                span.user-data__holder Aún no has ingresado una descripción para tu perfil
              p.user-data__txt(
                v-else="") {{ about }}
            .form__row_block(
              v-if="editAbout == true")
              form.form_user.user-data__txt(
                id="form-user-about"
                v-on:submit.prevent='updateAbout',
                v-if="editAbout == true")
                span.help(
                  v-show="errorLog.about") {{ errorLog.about }}
                textarea.form__edit_txt(
                  v-model="new_about",
                  name="about",
                  maxlength="340",
                  placeholder="Aún no has ingresado una descripción para tu perfil",
                  form="form-user-data")
                .form__row.form__row_away.user-edit_right
                  button.btn-tag Guardar
            a.user-edit__actions(
              @click.prevent="toggle('editAbout')",
              href="#"
              title="Editar perfil")
              span.btn_edit.i-edit-line <small class="hide"> Editar </small>
        //-Btn Prilovers Star
        .user-data__actions
          //- router-link.btn.btn_small.i-start-line(
          //-   to="#",
          //-   title="Ser Priloverstar") Ser Priloverstar
          router-link.btn.btn_small.i-sale(
            to="/publicar-venta",
            title="Publicar Producto") Publicar una venta

      //-Información direcciones
      .user-data_info
        .subhead Direcciones
        AddressList
        //- Bloque Editar Correo Perfil de usuaria
          1. Se debe seleccionar el ícono de editar
          y el correo se convierte en un campo de
          formulario que se puede editar. Luego se da guardar.
          2. Se debe confirmar el nuevo correo para que este
          cambio sea validado. (Ver Formulario de Registro paso 5)

        .dividers
          form.form_user(
            id="form-user-email"
            v-on:submit.prevent='updateEmail')
            label.subhead.dividers__title(
            for='editEmail') Correo
            .dividers__item(
              :class="{'dividers__item_active' :editEmail == true}")
              span.help(
                v-show="editEmail == true && emailError") {{ emailError }}
              .dividers__grid
                input.form__edit(
                  v-model='new_email',
                  id='editEmail',
                  type='email',
                  :disabled="editEmail == false",
                  :placeholder="email")
                span.dividers__actions
                  button.btn-tag(
                    v-show="editEmail == true") Guardar
                  a.dividers__edit.i-edit-line(
                    @click.prevent="toggle('editEmail')",
                    href="#",
                    title="Editar correo") <small class="hide"> Editar </small>

        //- Bloque Editar Teléfono Perfil de usuaria
          1. Selecciona el ícono de edición frente al
          teléfono y edita el número en el campo de formulario.
        .dividers
          form.form_user(
            id="form-user-phone"
            v-on:submit.prevent='updatePhone')
            label.subhead.dividers__title(
            for='editPhone') Teléfono
            .dividers__item(
              :class="{'dividers__item_active' :editPhone == true}")
              span.help(
                v-show="editPhone == true && errorLog.phone") {{ errorLog.phone }}
              .dividers__grid
                span.user-data__holder(
                  v-if="phone == null && editPhone == false") Aún no has ingresado tú número de teléfono
                input.form__edit(
                  v-else=""
                  v-model='new_phone',
                  id='editPhone',
                  :placeholder="phone",
                  :disabled="editPhone == false"
                  type='tel')

                span.dividers__actions
                  button.btn-tag(
                    v-show="editPhone == true") Guardar
                  a.dividers__edit.i-edit-line(
                    @click.prevent="toggle('editPhone')",
                    href="#",
                    title="Editar Teléfono") <small class="hide"> Editar </small>

</template>

<script src="./js/UserData.js"></script>
