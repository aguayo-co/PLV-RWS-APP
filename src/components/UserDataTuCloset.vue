<template lang="pug">
.single-section
  //- data User
  .user-data
    .user-cover-edit
      span.user-edit__actions
        span.btn_edit.i-edit-line(
          @click.prevent="toggle('editCover')") <small class="hide"> Editar </small>
      .cover(v-if="editCover == false")
        .cover__banner(v-if="cover")
          img.cover__picture(:src='cover')
        .cover__banner(v-else)
          //-1800 * 560
          img.cover__picture(:src="'/static/img/cover/cover-' + coverId + '.jpg'")
      form.form_user.user-cover__upfile(
        id="form-user-cover"
        v-on:submit.prevent='',
        v-else)
        .upfile.upfile__cover
          .upfile__item
            .upfile__label
              span.help(
                v-if="errorLog.cover") {{ errorLog.cover }}
              span.help_if(
                v-else)
                .upfile__text(
                  v-if="mqDesk") Arrastra una foto o
              .upfile__btn Sube una imagen
            croppa(
              :width="1800",
              :height="560",
              :quality="1",
              placeholder="",
              :prevent-white-space="true"
              v-model="new_cover")
        .user-edit__save.usert__save-right(
          @click="updateCover")
          button.btn-tag Guardar
    .user-header
      .user-header__item.user-item_gutter
        .user-avatar_cover
          .user-avatar-edit
            span.user-edit__actions
              span.btn_edit.i-edit-line(
                @click.prevent="toggle('editPicture')") <small class="hide"> Editar </small>
            .user-data__avatar(
              v-if="editPicture == false")
              img.user-data__img(
                v-if="picture"
                :src="picture",
                :alt="'Perfil' + ' ' + first_name")
              span.tool-user__letter(
                v-if="new_first_name && !picture") {{ new_first_name.charAt(0) }}
            form.form_user.user-avatar__upfile(
              id="form-user-avatar"
              v-on:submit.prevent='',
              v-else)
              .upfile__radius
                .upfile__item
                  .upfile__label
                    span.help(
                      v-if="errorLog.picture") {{ errorLog.picture }}
                    span.help_if(
                      v-else)
                      .upfile__text(
                        v-if="mqDesk") Arrastra una foto o
                    .upfile__btn Sube una imagen
                  croppa(
                    :width="200",
                    :height="200",
                    :quality="2",
                    placeholder="",
                    :prevent-white-space="true"
                    v-model="new_picture")
                .user-edit__save(
                  @click="updatePicture")
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
        //-Notificaciones
        .user-data__notify
          router-link.user-data__reviews(
            :to="{ name: 'reviews', params: { userId: id } }")
            ul.user-data__list
              li.user-data__value.i-like {{ ratings_positive_total_count }}
              li.user-data__value.i-like.i_flip {{ ratings_negative_total_count }}
              li.user-data__value.i-less-circle {{ ratings_neutral_total_count }}
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
    //-Btn Prilovers Star y publicar venta
    .user-data__actions
      router-link.btn.btn_small.i-tag(
        :to="{ name:'publicar-venta'}",
        title="Publicar un producto en Prilov") Publicar un producto
      router-link.btn.btn_small.i-starts(
        :to="{ name:'closet', params: { userId: id }}",
        title="Publicar un producto en Prilov") Vista pública de tu closet

</template>

<script src="./js/UserDataTuCloset.js"></script>
