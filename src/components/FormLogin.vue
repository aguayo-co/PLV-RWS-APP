<template lang="pug">
transition(name='modal-fade')
  section.modal.modal_scroll
    .modal__slot.content-slot
      .content-slot__inner
        header.modal__header
          h2.title Inicio de Sesión
          .btn_close.modal__btn_close.i-x(
            @click='close')
            span Cerrar

        form.form(
          v-on:submit='',
          action='#',
          method='post'
        )
          .form__row
            label.form__label(
              for='userEmail') Correo
            input.form__control(
              v-model='userEmail',
              id='userEmail',
              type='email')
          .form__row
            label.form__label(
              for='userPsw'
            ) Contraseña
            input.form__control(
              v-model='userPsw',
              id='userPsw',
              type='password')
            p.form__note.form__note_right
              |¿Olvidaste tu contraseña?
              | <a class='link_underline' @click='close' href='#/password' title='Ir a recuperar contraseña'>Recuperar contraseña.</a>
          .form__row.form__row_away
            button.btn.btn_solid.btn_block(
              @click.prevent='Login()') Iniciar sesión
        .break
          span.break__txt O
        //- falta cerrar la modal
        a.btn.btn_block(
          href='#/SingUp',
          title='Ir a Registro',
          @click='close') Regístrate
</template>

<script>
export default {
  name: 'FormLogin',
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>
