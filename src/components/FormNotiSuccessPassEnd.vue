<template lang="pug">
  .notify
    .notify__ico.i-ok
      h2.title.notify__title Has cambiado exitosamente tu contraseña
      .notify__footer.form__row_away
        p.notify__row
          //-TO-DO: poner URL de usuaria
          a.btn.btn_solid.btn_block(
          href='/') Ir a mi cuenta
</template>

<script>
export default {
  name: 'FormSuccessPassEnd',
  data () {
    return {
      userEmail: ''
    }
  }
}
</script>
