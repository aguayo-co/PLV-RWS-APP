<template lang="pug">
  //- Este componente se toma de User/data
    se integran las funcionalidades desarrolladas
    por Federico.
  .compra-data_info
    .subhead Direcciones
      small.small_high Esta sería la dirección a la que la vendedora enviará tu producto. También servirá de referencia en caso de que decidan juntarse.
    ul.dividers
      li.dividers__item(
        v-if="addresses == null")
        span.user-data__holder Aún no has ingresado una dirección para tus compras
      //- To-Do: Funcionalidad seleccionar
          addresss pricipal class:.dividers__item_select
      li.dividers__item(
        v-else="",
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
        form.form_user.user-data__form(
          id="form-user-address-edit"
          v-on:submit.prevent='',
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

      li.dividers__bottom(
        :class="{'dividers__bottom_active' :newAddress == true}")
        a.dividers__add.i-plus(
          @click.prevent="toggle('newAddress')",
          href="#",
          title="Agregar dirección") Nueva dirección
      //-TO-DO: efect transition
      form.form_user.user-data__form(
        id="form-user-address-new"
        v-on:submit.prevent='',
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
    .dividers
      form.form_user(
        id="form-user-phone"
        v-on:submit.prevent='updatePhone')
        label.subhead.dividers__title(
        for='editPhone') Teléfono
          small.small_high Danos tu número celular  para que el vendedor pueda comunicarse contigo
        .dividers__item(
          :class="{'dividers__item_active' :editPhone == true}")
          span.help(
            v-show="editPhone == true && errorLog.phone") {{ errorLog.phone }}
          .dividers__grid
            span.user-data__holder(
              v-if="phone == null && editPhone == false") Aún no has ingresado tú número de teléfono
            input.form__edit(
              v-else=""
              v-model='phone',
              id='editPhone',
              :placeholder="phone",
              :disabled="editPhone == false"
              type='tel')

            span.dividers__actions
              button.btn-tag(
                v-show="editPhone == true") Guardar
              a.dividers__edit.i-edit-line(
                @click.prevent="toggle('editPhone')",
                href="#",
                title="Editar Teléfono") <small class="hide"> Editar </small>
  //-End Información direcciones
</template>

