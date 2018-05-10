<template lang="pug">
.layout-slot
  .content-slot
    p.preload(v-if="loading")
      span.preload__spin.preload__spin_1
      span.preload__spin.preload__spin_2
      span.preload__spin.preload__spin_3
      span.preload__spin.preload__spin_4
    .content-slot__inner(v-else)
      //- Formulario recuperar PASS
      FormPasswordRecovery(v-if="validToken")
      .alert(v-else)
        p.alert__txt.i-sad No es posible recuperar tu contraseña con estos datos. Por favor inténtalo de nuevo.
</template>

<script>
import usersAPI from '@/api/user'
import FormPasswordRecovery from '@/components/FormPasswordRecovery'
export default {
  name: 'PasswordRecoverySet',
  components: {
    FormPasswordRecovery
  },
  data () {
    return {
      validToken: false,
      loading: true
    }
  },
  computed: {
    token () {
      return this.$route.params.tokenString
    },
    email () {
      return this.$route.params.email
    }
  },
  created: function () {
    usersAPI.validateToken(this.token, this.email)
      .then(response => {
        this.loading = false
        this.validToken = true
      })
      .catch(e => {
        this.loading = false
      })
  }
}
</script>
