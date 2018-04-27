<template lang="pug">
  ul.dividers
    li.dividers__item(
      v-if="addresses == null")
      span.user-data__holder Aún no has ingresado ninguna dirección para tu cuenta
    //- To-Do: Funcionalidad seleccionar
        addresss pricipal class:.dividers__item_select
    li.dividers__item(
      v-else="",
      v-for="address in addresses")
      .dividers__grid.dividers__list(
        :class="{'dividers__list_active': isActive == address}")
        input.form__input-radio(
        name="shippingAddress"
        :value="address.id"
        :id="address.id"
        v-model="cartAddressId"
        type="radio"
        v-if="inShoppingCart")
        label.form__label_radio(
          v-if="inShoppingCart"
          :for="address.id") {{ address | address }}
        span(
          v-else="") {{ address | address }}
        span.dividers__actions
          a.dividers__select.i-star-on(
            v-if="!inShoppingCart"
            @click.prevent="setFavorite(address)",
            :class="{dividers__select_on: favorite_address_id == address.id}",
            href="#",
            title="Seleccionar Dirección") <small class="hide"> Seleccionar </small>
          a.dividers__edit.i-edit-line(
            @click.prevent="IsActive(address)",
            href="#",
            title="Editar Dirección") <small class="hide"> Editar </small>
      AddressEdit(
        v-if="isActive == address"
        :regionsList="regionsList"
        :address="address"
        v-on:close="NotActive")
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
      :class="{'dividers__bottom_active': newAddress == true}")
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
              for='new-number') Número
            span.help(
              v-show="errorLog.number") {{ errorLog.number }}
            input.form__control(
              id='new-number'
              v-model="newAddressData['number']"
              type='text')
          .form__row
            label.form__label(
              for='new-street') Calle
            span.help(
              v-show="errorLog.street") {{ errorLog.street }}
            input.form__control(
              id='new-street'
              v-model="newAddressData['street']"
              type='text')

        .form__grid
          .form__row
            label.form__label(
              for='new-additional') Adicional
            span.help(
              v-show="errorLog.additional") {{ errorLog.additional }}
            input.form__control(
              id='new-additional'
              v-model="newAddressData['additional']"
              type='text')
          .form__row
            label.form__label(
              for='new-address-region') Región
            span.help(
              v-show="errorLog.region") {{ errorLog.region }}
            select.form__select(
              v-model="newAddressData['region']")
              option
              option(
                v-for="region in regions") {{ region }}

        .form__grid
          .form__row
            label.form__label(
              for='new-address-province') Provincia
            span.help(
              v-show="errorLog.province") {{ errorLog.province }}
            select.form__select(
              v-model="newAddressData['province']")
              option
              option(
                v-for="province in provinces") {{ province }}

          .form__row
            label.form__label(
              for='new-address-commune') Comuna
            span.help(
              v-show="errorLog.commune") {{ errorLog.commune }}
            select.form__select(
              v-model="newAddressData['commune']")
              option
              option(
                v-for="commune in communes") {{ commune }}

        .form__grid.form__grid_center.form__row_away
          .form__row
            button.btn(
              type="reset"
              @click.prevent="toggleNewAddress()"
              title="Cancelar Edición") Cancelar
          .form__row
            button.btn.btn_solid(
              type="submit"
              title="Guardar Cambios") Guardar dirección
</template>

<script src="./js/AddressList.js"></script>
