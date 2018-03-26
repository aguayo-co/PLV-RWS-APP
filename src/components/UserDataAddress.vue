<template lang="pug">
  //-TO-DO: efect transition
  form.form_user.user-data__form(
    id="form-user-address-edit"
    v-on:submit.prevent='')
    fieldset.form__set
      legend.form__legend Editar Dirección
      .form__grid
        .form__row
          label.form__label(
            :for="address.id + 'address'") Dirección
          input.form__control(
            :id="address.id + 'address'"
            v-model="new_address"
            type='text')
        .form__row
          label.form__label(
            :for="address.id + 'region'") Región
          select.form__select(
            :id="address.id + 'region'"
            v-model="new_region")
            option
            option item2
            option item3
            option item4
            option item5
            option item6
      .form__grid
        .form__row
          label.form__label(
            :for="address.id  + 'city'") Ciudad
          select.form__select(
            :id="address.id + 'city'")
            option
            option item2
            option item3
            option item4
            option item5
            option item6
        .form__row
          label.form__label(
            :for="address.id + 'zone'") Comuna
          select.form__select(
            :id="address.id + 'zone'"
            v-model="new_zone")
            option
            option item2
            option item3
            option item4
            option item5
            option item6
      .form__grid_reverse.form__row_away
        .form__row
          a.link_underline(
            @click.prevent="deleteAddress",
            href="#",
            title="Eliminar") Eliminar dirección
        .form__grid_group
          .form__row
            a.btn.form__grid-item(
              @click.prevent="close",
              href="#",
              title="Cancelar Edición") Cancelar
          .form__row
            a.btn.btn_solid.form__grid-item(
              @click.prevent="updateAddress",
              href="#",
              title="Guardar Cambios") Editar dirección
</template>

<script src="./js/UserDataAddress.js"></script>
