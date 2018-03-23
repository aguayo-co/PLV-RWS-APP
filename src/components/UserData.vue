<template lang="pug">
section.single
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
    .user-data
      //-TO-DO if AUTH datos dinámicos USER
      form.form(
        id="form-user-data"
        v-on:submit='',
        action='#',
        method='post')
        .user-over(
          :class="{'user-avatar_active' :editAvatar == true}")
          .user-header
            .user-header__item
              .user-avatar-edit
                span.user-edit__actions
                  span.btn_edit.i-edit-line(
                    @click.prevent="toggle('editAvatar')") <small class="hide"> Editar </small>
                .user-data__avatar
                  //- clic en foto de perfil de usuario
                    Se despliega un input (file) donde el usuario
                    puede subir y editar su foto de perfil.
                  img.user-data__img(
                    :src="picture",
                    :alt="'Perfil' + ' ' + first_name")
              .user-avatar__upfile(
                v-show="editAvatar == true")
                .upfile__small
                  p.form__label Foto de perfil
                  .upfile__item
                    .upfile__label
                      .upfile__text.i-upload(
                        v-if="mqDesk") Arrastra una foto o
                      .upfile__btn Sube una imagen
                    croppa(
                      :width="300",
                      :height="300",
                      :quality="2",
                      placeholder="",
                      :prevent-white-space="true")
                  .user-edit__save
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
                  //-TO-do animate slide
                  transition(slide-toggle)
                    .user-header-edit__grid(
                      v-show="editName == true")
                      .form__row
                        label.form__label(
                          for='nombre') Editar Nombre
                        input.form__edit(
                          v-model='first_name',
                          id='username'
                        )
                      .form__row
                        label.form__label(
                          for='apellidos') Editar Apellidos
                        input.form__edit(
                          v-model='last_name',
                          id='userLast',
                          type='text'
                        )
                      .form__row.user-edit__save
                        button.btn-tag Guardar

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
                    li.user-data__track {{ followers_count }} Seguidores
                    li.user-data__track {{ following_count }} Siguiendo

          //-editar About perfil
          .user-header-edit
            .user-header-edit__item.edit__item_top
              .form__row_top
                p.user-data__txt(
                  v-if="editAbout == false",
                  @click.prevent="toggle('editAbout')")
                  p.user-data__txt {{ about }}
                .user-data__txt(
                  v-if="editAbout == true")
                  textarea.form__edit_txt(
                    v-model="about",
                    name="about",
                    maxlength="340",
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
            //-   title="Ser Priloverstar") Ser Prilovestar
            router-link.btn.btn_small.i-sale(
              to="/publicar-venta",
              title="Publicar Producto") Publicar una venta

        //-Información direcciones
        .user-data_info
          legend.subhead Direcciones
          ul.dividers
            //- To-Do: Funcionalidad seleccionar
                addresss pricipal class:.dividers__item_select
            li.dividers__item(
              v-for="addressList in addresses")
              .dividers__grid.dividers__list(
                :class="{'dividers__list_active' :isActive == addressList}"
              ) {{ addressList.address }},  {{ addressList.region }},  {{ addressList.city }}, {{ addressList.zone }}
                span.dividers__actions
                  a.dividers__select.i-star-on(
                    @click.preven="UserNewAddress = true",
                    href="#",
                    title="Seleccionar Dirección") <small class="hide"> Seleccionar </small>
                  a.dividers__edit.i-edit-line(
                    @click.prevent="IsActive(addressList)",
                    href="#",
                    title="Editar Dirección") <small class="hide"> Editar </small>
              //-TO-DO: efect transition
              .user-data__form(
                v-if="isActive == addressList")
                  fieldset.form__set
                    legend.form__legend Editar Dirección
                    .form__grid
                      .form__row
                        label.form__label(
                          :for="addressList.id + 'address'") Dirección
                        input.form__control(
                          :id="addressList.id + 'address'",
                          v-model="addressList.address",
                          type='text')
                      .form__row
                        label.form__label(
                          :for="addressList.id + 'region'") Región
                        select.form__select
                          option
                          option item2
                          option item3
                          option item4
                          option item5
                          option item6
                    .form__grid
                      .form__row
                        label.form__label(
                          :for="addressList.id  + 'city'") Ciudad
                        select.form__select
                          option
                          option item2
                          option item3
                          option item4
                          option item5
                          option item6
                      .form__row
                        label.form__label(
                          :for="addressList.id + 'comuna'") Comuna
                        select.form__select
                          option
                          option item2
                          option item3
                          option item4
                          option item5
                          option item6
                    .form__grid_reverse.form__row_away
                      .form__row
                        a.link_underline(
                          @click.prevent="NotActive(addressList)",
                          href="#",
                          title="Eliminar") Eliminar dirección
                      .form__grid_group
                        .form__row
                          a.btn.form__grid-item(
                            @click.prevent="NotActive(addressList)",
                            href="#",
                            title="Cancelar Edición") Cancelar
                        .form__row
                          a.btn.btn_solid.form__grid-item(
                            @click.prevent="NotActive(addressList)",
                            href="#",
                            title="Guardar Cambios") Editar dirección

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
              :class="{'dividers__bottom_active' :newAddress == true}")
              a.dividers__add.i-plus(
                @click.prevent="toggle('newAddress')",
                href="#",
                title="Agregar dirección") Nueva dirección
            //-TO-DO: efect transition
            .user-data__form(
              v-if="newAddress == true",
              v-effect="slide")
                fieldset.form__set
                  legend.form__legend Nueva dirección
                  .form__grid
                    .form__row
                      label.form__label(
                        for='new-address') Dirección
                      input.form__control(
                        id='new-address',
                        v-on:keyup.enter="addresses.address",
                        v-model="addresses.address",
                        type='text')
                    .form__row
                      label.form__label(
                        for='new-address-region') Región
                      select.form__select
                        option
                        option item2
                        option item3
                        option item4
                        option item5
                        option item6
                  .form__grid
                    .form__row
                      label.form__label(
                        for='new-address-city') Ciudad
                      select.form__select
                        option
                        option item2
                        option item3
                        option item4
                        option item5
                        option item6
                    .form__row
                      label.form__label(
                        for='new-address-zone') Comuna
                      select.form__select
                        option
                        option item2
                        option item3
                        option item4
                        option item5
                        option item6

                  .form__grid.form__grid_center.form__row_away
                    .form__row
                      a.btn(
                        @click.prevent="toggle('newAddress')",
                        href="#",
                        title="Cancelar Edición") Cancelar
                    .form__row
                      a.btn.btn_solid(
                        @click.prevent="toggle('newAddress')",
                        href="#",
                        title="Guardar Cambios") Editar dirección

          //- Bloque Editar Correo Perfil de usuaria
            1. Se debe seleccionar el ícono de editar
            y el correo se convierte en un campo de
            formulario que se puede editar. Luego se da guardar.
            2. Se debe confirmar el nuevo correo para que este
            cambio sea validado. (Ver Formulario de Registro paso 5)

          .dividers
            label.subhead.dividers__title(
            for='editEmail') Correo
            .dividers__item(
                :class="{'dividers__item_active' :editEmail == true}")
              .dividers__grid
                input.form__edit(
                  v-model='email',
                  id='editEmail',
                  type='email',
                  :disabled="editEmail == false"
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
            label.subhead.dividers__title(
            for='editPhone') Teléfono
            .dividers__item(
              :class="{'dividers__item_active' :editTel == true}")
              .dividers__grid
                input.form__edit(
                  v-model='phone',
                  id='editPhone',
                  :placeholder="phone",
                  :disabled="editTel == false"
                  type='tel')

                span.dividers__actions
                  button.btn-tag(
                    v-show="editTel == true") Guardar
                  a.dividers__edit.i-edit-line(
                    @click.prevent="toggle('editTel')",
                    href="#",
                    title="Editar Teléfono") <small class="hide"> Editar </small>

</template>

<script src="./js/UserData.js"></script>
