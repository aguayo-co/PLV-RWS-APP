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
    li.dividers__bottom(
      :class="{'dividers__bottom_active': newAddress == true}")
      a.dividers__add.i-plus(
        @click.prevent="toggleNewAddress()",
        href="#",
        title="Agregar dirección") Nueva dirección
    form.form_user.user-data__form(
      id="form-user-address-new"
      @:submit.prevent=''
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
              @keyup="errorLog.street = undefined",
              id='new-street'
              v-model="newAddressData['street']"
              type='text')
          .form__row
            label.form__label(
              for='new-number') Número
            span.help(
              v-show="errorLog.number") {{ errorLog.number }}
            input.form__control(
              @keyup="errorLog.number = undefined",
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
              @keyup="errorLog.additional = undefined",
              id='new-additional'
              v-model="newAddressData['additional']"
              type='text')
          .form__row
              label.form__label(
                for='new-address-region') Región
              span.help(
                v-show="errorLog.region") {{ errorLog.region }}
              select.form__select(
                @change="errorLog.region = undefined",
                v-model="newAddressData['region']")
                option
                option(
                  v-if="regions",
                  v-for="region in regions.sort()") {{ region }}

        .form__grid
          .form__row
            .form__hide(v-if="newAddressData['region']")
              label.form__label(
                for='new-address-province') Provincia
              span.help(
                v-show="errorLog.province") {{ errorLog.province }}
              select.form__select(
                @change="errorLog.province = undefined",
                v-model="newAddressData['province']")
                option
                option(
                  v-if="provinces"
                  v-for="province in provinces.sort()") {{ province }}

          .form__row
            .form__hide(v-if="newAddressData['province']")
              label.form__label(
                for='new-address-commune') Comuna
              span.help(
                v-show="errorLog.commune") {{ errorLog.commune }}
              select.form__select(
                @change="errorLog.commune = undefined",
                v-model="newAddressData['commune']")
                option
                option(
                  v-if="communes"
                  v-for="commune in communes.sort()") {{ commune }}

        .form__grid.form__grid_center.form__row_away
          .form__row
            button.btn(
              type="reset"
              @click.prevent="toggleNewAddress()"
              title="Cancelar Edición") Cancelar
          .form__row
            button.btn.btn_solid(
              @click.prevent="createAddress($event)",
              title="Guardar Cambios") Guardar dirección
</template>

<script src="./js/AddressList.js"></script>
