<template lang="pug">
  //-TO-DO: efect transition
  form.form_user.user-data__form(
    id="form-user-address-edit"
    v-on:submit.prevent='updateAddress($event)')
    fieldset.form__set
      legend.form__legend Editar Dirección
      .form__grid
        .form__row
          label.form__label(
            :for="address.id + 'street'") Calle
          span.help(
            v-show="errorLog.street") {{ errorLog.street }}
          input.form__control(
            @input="errorLog.street = null",
            :id="address.id + 'street'"
            v-model="new_street"
            type='text')
        .form__row
          label.form__label(
            :for="address.id + 'number'") Número
          span.help(
            v-show="errorLog.number") {{ errorLog.number }}
          input.form__control(
            @input="errorLog.number = null",
            :id="address.id + 'number'"
            v-model="new_number"
            type='text')

      .form__grid
        .form__row
          label.form__label(
            :for="address.id + 'additional'") Adicional
          span.help(
            v-show="errorLog.additional") {{ errorLog.additional }}
          input.form__control(
            @input="errorLog.aditional = null",
            :id="address.id + 'additional'"
            v-model="new_additional"
            type='text')
        .form__row
          label.form__label(
            :for="address.id + 'commune'") Comuna
          span.help(
            v-show="errorLog.commune") {{ errorLog.commune }}
          MultiSelect(
            :id="address.id + 'commune'"
            @open="errorLog.commune = null",
            v-model="new_commune",
            :options="multiSelectOptions",
            :multiple="false",
            group-values="communes",
            group-label="region",
            :group-select="false",
            placeholder="Escribe para buscar",
            selectLabel="Seleccionar",
            deselectLabel="Eliminar"
          )
            span(slot="noResult").
              Ups, no encontramos ninguna comuna.
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
