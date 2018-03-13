<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario de registro
      FormSignUp(
        v-if="flagSignUp == 'SignUp'"
        @setSuccess= 'setSuccess'
        @setError= 'setError')
      //- Noti OK
      FormSuccess(
        v-else-if="flagSignUp == 'Success'"
        )
      //- Noti Error
      FormError(
        v-else
        @setSignUp='setSignUp')

</template>

<script>
import FormSignUp from '@/components/FormSignUp'
import FormSuccess from '@/components/FormNotiSuccess'
import FormError from '@/components/FormNotiErrorServer'

export default {
  name: 'SignUp',
  components: {
    FormSignUp,
    FormSuccess,
    FormError
  },
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
  }
}
</script>
