<template lang="pug">
  .notify
    h1.title.notify__title {{getName}}, bienvenida a Prilov
    .notify__body
      p Ya puedes publicar tu primera venta y realizar compras en toda la tienda.
    .notify__footer
      .notify__row
        a.btn.btn_solid.btn_block(
        href='#') Publicar una venta
      .notify__row
        a.btn.btn_block(
        href='#') Ir a la tienda
</template>

<script>
export default {
  name: 'FormSuccess',
  data: function () {
    return {
      flagSignUp: 'SignUp'
    }
  },
  methods: {
    setSignUp () {
      this.flagSignUp = 'SignUp'
    },
    setSuccess () {
      this.flagSignUp = 'Success'
    },
    setError () {
      this.flagSignUp = 'Error'
    }
  },
  computed: {
    getName () {
      return this.$store.getters.getName
    }
  }
}
</script>
