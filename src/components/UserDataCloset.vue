<template lang="pug">
.single-section
  .user-data
    .user-over(
      :class="{'user-avatar_active' :editPicture == true}")
      .cover
        span.user-edit__actions
          span.btn_edit.i-edit-line(
            @click.prevent="toggle('editCover')") <small class="hide"> Editar </small>
        .user-data__cover
          //- clic en foto de perfil de usuario
            Se despliega un input (file) donde el usuario
            puede subir y editar su foto de perfil.
          img.user-data__cover-img(
            :src="cover",
            :alt="'Cover' + ' ' + first_name")
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
                :src="picture",
                :alt="'Perfil' + ' ' + first_name")
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
          //- ul.user-data-nav
          //-   li.user-data-nav__item
          //-     a.btn-tag(@click.prevent="changePassword") Cambiar contraseña
          //-   li.user-data-nav__item
          //-     a.btn-tag Eliminar cuenta
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
  .user-data__actions
    //- router-link.btn.btn_small.i-start-line(
    //-   to="#",
    //-   title="Ser Priloverstar") Ser Priloverstar
    router-link.btn.btn_small(
      to="/publicar-venta",
      title="Publicar Producto") Publicar una venta

</template>

<script src="./js/UserTuCloset.js"></script>
