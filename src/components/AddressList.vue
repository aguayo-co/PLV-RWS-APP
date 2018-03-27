<template lang="pug">
  ul.dividers
    li.dividers__item(
      v-if="addresses == null")
      span.user-data__holder Aún no has ingresado una dirección para tus compras
    //- To-Do: Funcionalidad seleccionar
        addresss pricipal class:.dividers__item_select
    li.dividers__item(
      v-else="",
      v-for="address in addresses")
      .dividers__grid.dividers__list(
        :class="{'dividers__list_active' :isActive == address}"
      ) {{ address.address }},  {{ address.region }},  {{ address.city }}, {{ address.zone }}
        span.dividers__actions
          a.dividers__select.i-star-on(
            @click.preven="UserNewAddress = true",
            href="#",
            title="Seleccionar Dirección") <small class="hide"> Seleccionar </small>
          a.dividers__edit.i-edit-line(
            @click.prevent="IsActive(address)",
            href="#",
            title="Editar Dirección") <small class="hide"> Editar </small>
      <address-edit v-if="isActive == address" :regionsList=regionsList :address=address v-on:close="NotActive"></address-edit>
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
        @click.prevent="toggleNewAddress()",
        href="#",
        title="Agregar dirección") Nueva dirección
    //-TO-DO: efect transition
    form.form_user.user-data__form(
      id="form-user-address-new"
      v-on:submit.prevent='createAddress'
      v-if='newAddress')
      fieldset.form__set
        legend.form__legend Nueva dirección
        .form__grid
          .form__row
            label.form__label(
              for='new-address') Dirección
            span.help(
              v-show="errorLog.new_address") {{ errorLog.new_address }}
            input.form__control(
              id='new-address'
              v-model="newAddressData['new_address']"
              type='text')
          .form__row
            label.form__label(
              for='new-address-region') Región
            span.help(
              v-show="errorLog.new_region") {{ errorLog.new_region }}
            select.form__select(
              v-model="newAddressData['new_region']")
              option
              option(
                v-for="region in regions") {{ region }}

        .form__grid
          .form__row
            label.form__label(
              for='new-address-city') Ciudad
            select.form__select(
              v-model="newAddressData['new_city']")
              option
              option(
                v-for="citi in cities") {{ citi }}

          .form__row
            label.form__label(
              for='new-address-zone') Comuna
            span.help(
              v-show="errorLog.new_zone") {{ errorLog.new_zone }}
            select.form__select(
              v-model="newAddressData['new_zone']")
              option
              option(
                v-for="zone in zones") {{ zone }}

        .form__grid.form__grid_center.form__row_away
          .form__row
            button.btn(
              type="reset"
              @click.prevent="toggleNewAddress()"
              title="Cancelar Edición") Cancelar
          .form__row
            button.btn.btn_solid(
              type="submit"
              title="Guardar Cambios") Editar dirección
</template>

<script src="./js/AddressList.js"></script>
