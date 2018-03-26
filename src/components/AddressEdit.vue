<template lang="pug">
  //-TO-DO: efect transition
  form.form_user.user-data__form(
    id="form-user-address-edit"
    v-on:submit.prevent='updateAddress')
    fieldset.form__set
      legend.form__legend Editar Dirección
      .form__grid
        .form__row
          label.form__label(
            :for="address.id + 'address'") Dirección
          span.help(
            v-show="errorLog.address") {{ errorLog.address }}
          input.form__control(
            :id="address.id + 'address'"
            v-model="new_address"
            type='text')
        .form__row
          label.form__label(
            :for="address.id + 'region'") Región
          span.help(
            v-show="errorLog.region") {{ errorLog.region }}
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
          span.help(
            v-show="errorLog.zone") {{ errorLog.zone }}
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
            button.btn.form__grid-item(
              type="reset"
              @click.prevent="close",
              title="Cancelar Edición") Cancelar
          .form__row
            button.btn.btn_solid.form__grid-item(
              type="submit"
              title="Guardar Cambios") Editar dirección
</template>

<script src="./js/AddressEdit.js"></script>
