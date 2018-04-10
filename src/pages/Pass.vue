<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario recuperar PASS
      FormPass(
        v-if="getPassState == 'requestForm'")
      //- NotiSuccess
      FormSuccess(v-else-if ="getPassState == 'requestSended'")

      //- Formulario Confirmar PASS
      FormPassEnd(v-else-if="getPassState == 'requestChange'")
      //- NotiSuccess
      FormNotiSuccessPassEnd(v-else-if="getPassState == 'recoverPassSuccess'")
      //- Error
      FormNotiErrorServer(v-else)
</template>

<script>
import FormPass from '@/components/FormPass'
import FormSuccess from '@/components/FormNotiSuccessPass'
import FormPassEnd from '@/components/FormPassEnd'
import FomrNotierrorServer from '@/components/FormNotiErrorServer'
import FormNotiSuccessPassEnd from '@/components/FormNotiSuccessPassEnd'
export default {
  name: 'Pass',
  components: {
    FormPass,
    FormSuccess,
    FormPassEnd,
    FormNotiSuccessPassEnd,
    FomrNotierrorServer
  },
  data () {
    return {
      userEmail: this.$store.getters['PasswordModule/getUserEmail'],
      token: this.$route.query.token
    }
  },
  computed: {
    getPassState () {
      return this.$store.getters['PasswordModule/getPassState']
    },
    getToken () {
      return this.$store.getters['PasswordModule/getPassToken']
    }
  },
  created () {
    this.$store.dispatch('PasswordModule/actionSetChangePassToken', this.$route.query.token)
    this.$axios.post('/api/users/password/recovery/' + this.userEmail, {
      token: this.$route.query.token
    })
      .then(response => {
        console.log('response ' + response)
        this.$store.dispatch('PasswordModule/actionSetPassState', 'requestChange')
        // this.$store.set('userAuth', {token: response.data.api_token})
      })
      .catch(e => {
        console.log(e) // Aca se obtiene el error del servidor
        // alert(e.response.data.errors.exists[0])
      })
  }
}
</script>
