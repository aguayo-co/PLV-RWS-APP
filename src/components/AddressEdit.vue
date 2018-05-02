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
            :for="address.id + 'street'") Calle
          span.help(
            v-show="errorLog.street") {{ errorLog.street }}
          input.form__control(
            :id="address.id + 'street'"
            v-model="new_street"
            type='text')
        .form__row
          label.form__label(
            :for="address.id + 'address'") Número
          span.help(
            v-show="errorLog.number") {{ errorLog.number }}
          input.form__control(
            :id="address.id + 'number'"
            v-model="new_number"
            type='text')

      .form__grid
        .form__row
          label.form__label(
            :for="address.id + 'address'") Adicional
          span.help(
            v-show="errorLog.additional") {{ errorLog.additional }}
          input.form__control(
            :id="address.id + 'additional'"
            v-model="new_additional"
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
            option(
              v-for="region in regions") {{ region }}
      .form__grid
        .form__row
          label.form__label(
            :for="address.id  + 'province'") Ciudad
          select.form__select(
            v-model="new_province"
            :id="address.id + 'province'")
            option
            option(
              v-for="province in provinces") {{ province }}
        .form__row
          label.form__label(
            :for="address.id + 'commune'") Comuna
          span.help(
            v-show="errorLog.commune") {{ errorLog.commune }}
          select.form__select(
            :id="address.id + 'commune'"
            v-model="new_commune")
            option
            option(
              v-for="commune in communes") {{ commune }}
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
