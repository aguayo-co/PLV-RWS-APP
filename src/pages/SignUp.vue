<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario de registro
      FormSignUp

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
    }
  },
  methods: {

  }
}
</script>
