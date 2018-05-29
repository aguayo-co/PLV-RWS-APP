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
            @click.prevent="setFavorite(address.id)",
            :class="{dividers__select_on: favorite_address_id == address.id}",
            href="#",
            title="Seleccionar Dirección") <small class="hide"> Seleccionar </small>
          a.dividers__edit.i-edit-line(
            @click.prevent="IsActive(address)",
            href="#",
            title="Editar Dirección") <small class="hide"> Editar </small>
      AddressEdit(
        v-if="isActive == address"
        :multiSelectOptions="multiSelectOptions"
        :address="address"
        v-on:close="IsActive(null)")
    li.dividers__bottom(
      :class="{'dividers__bottom_active': newAddress == true}")
      a.dividers__add.i-plus(
        @click.prevent="toggleNewAddress()",
        href="#",
        title="Agregar dirección") Nueva dirección
    form.form_user.user-data__form(
      id="form-user-address-new"
      @submit.prevent='createAddress($event)'
      v-if='newAddress')
      fieldset.form__set
        legend.form__legend Nueva dirección
        .form__grid
          .form__row
            label.form__label(
              for='new-street') Calle
            span.help(
              v-show="errorLog.street") {{ errorLog.street }}
            input.form__control(
              @input="errorLog.street = null",
              id='new-street'
              v-model="newAddressData['street']"
              type='text')
          .form__row
            label.form__label(
              for='new-number') Número
            span.help(
              v-show="errorLog.number") {{ errorLog.number }}
            input.form__control(
              @input="errorLog.number = null",
              id='new-number'
              v-model="newAddressData['number']"
              type='text')

        .form__grid
          .form__row
            label.form__label(
              for='new-additional') Adicional
            span.help(
              v-show="errorLog.additional") {{ errorLog.additional }}
            input.form__control(
              @input="errorLog.additional = null",
              id='new-additional'
              v-model="newAddressData['additional']"
              type='text')
          .form__row
            label.form__label(
              for='new-commune') Comuna
            span.help(
              v-show="errorLog.commune") {{ errorLog.commune }}
            MultiSelect(
              id="new-commune"
              @open="errorLog.commune = null",
              v-model="newAddressData['commune']",
              :options="multiSelectOptions",
              :multiple="false",
              group-values="communes",
              group-label="region",
              :group-select="false",
              placeholder="Escribe para buscar"
            )
              span(slot="noResult").
                Ups, no encontramos ninguna comuna.
        .form__grid.form__grid_center.form__row_away
          .form__row
            button.btn(
              type="reset"
              @click.prevent="toggleNewAddress()"
              title="Cancelar Edición") Cancelar
          .form__row
            button.btn.btn_solid(
              title="Guardar Cambios") Guardar dirección
</template>

<script src="./js/AddressList.js"></script>
