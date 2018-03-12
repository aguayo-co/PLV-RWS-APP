<template lang="pug">
section.single
  .single__inner
    //- User Profile
    header.single__header
      h1.single__title Datos Personales
    //- data User
    .user-data
      .user-header
        .user-header__item
          .user-data__avatar
            //-TO-DO if AUTH datos dinámicos USER
            img.user-data__img(
              src="/static/img/demo/user-avatar.jpg",
              alt="Perfil Damarys Saldaña")
        .user-header__item
          h2.user-data__title {{ getName }} Damarys Saldaña
          .user-data__notify
            ul.user-data__list
              li.user-data__value.i-like 20
              li.user-data__value.i-like.i_flip 0
              li.user-data__value.i-less 0
            ul.user-data__list
              li.user-data__track 349 Seguidores
              li.user-data__track 45 Siguiendo
      .user-data__actions
        a.btn.btn_small.i-start-line(
          href="#",
          title="Ser Priloverstar") Ser Prilovestar

    .user-data_info
      h3.subhead Direcciones
      ul.dividers
        li.dividers__item Alberto Blest Gana 803, Padre Hurtado, Santiago
          .dividers__control
            a.dividers__btn.i-heart-on(
              href="#",
              title="Seleccionar") <small>Seleccionar</small>
            a.dividers__btn.i-edit(
              href="#",
              title="Editar") <small>Editar</small>
        li.dividers__item Pasaje la Lenga  1539, Cerro Navia , Santiago
          .dividers__control
            a.dividers__btn.i-heart-on(
              href="#",
              title="Editar") <small>Seleccionar</small>
            a.dividers__btn.i-edit(
              href="#",
              title="Editar") <small>Editar</small>
        li.dividers__item Los flamencos 1300, Mapú, Santiago
          .dividers__control
            a.dividers__btn.i-heart-on(
              href="#",
              title="Editar") <small>Seleccionar</small>
            a.dividers__btn.i-edit(
              href="#",
              title="Editar") <small>Editar</small>
        li.dividers__bottom
          a.dividers__btn.i-plus(
              href="#",
              title="Editar") Nueva dirección
      .user-data__form
        form.form(
          v-on:submit='',
          action='#',
          method='post')
          fieldset.form__set
            legend.form__legend Nueva dirección
            .form__grid
              .form__row
                label.form__label(
                  for='address') Dirección
                input.form__control(
                  v-model='address',
                  id='address',
                  type='text')
              .form__row
                label.form__label(
                  for='number') Número
                input.form__control(
                  v-model='number',
                  id='number',
                  type='text')
              .form__row
                label.form__label(
                  for='number') Depto/Villa/block
                input.form__control(
                  v-model='number',
                  id='number',
                  type='text')
            .form__grid
              .form__row
                label.form__label(
                  for='address') Ciudad
                input.form__control(
                  v-model='address',
                  id='address',
                  type='text')
              .form__row
                label.form__label(
                  for='number') Región
                input.form__control(
                  v-model='number',
                  id='number',
                  type='text')
              .form__row
                label.form__label(
                  for='number') Comuna
                input.form__control(
                  v-model='number',
                  id='number',
                  type='text')
            .form__grid.form__grid_center.form__row_away
              .form__row
                span.btn Cancelar
              .form__row
                button.btn.btn_solid Agregar nueva dirección

      h3.subhead Correo
      ul.dividers
        li.dividers__item Dabe.neleb@gmail.com
           .dividers__control
            a.dividers__btn.i-edit(
              href="#",
              title="Editar") <small>Editar</small>

      h3.subhead Teléfono
      ul.dividers
        li.dividers__item +56 9 74783147
          .dividers__control
            a.dividers__btn.i-edit(
              href="#",
              title="Editar") <small>Editar</small>
</template>

<script>
export default {
  name: 'UserData',
  computed: {
    getName () {
      return this.$store.getters['UserModule/getUserName']
    }
  }
}
</script>
