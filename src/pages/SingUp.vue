<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario de registro
      FormSingUp
      //- Noti OK
      FormSuccess
      //- Noti Error
      FormError

</template>

<script>
import FormSingUp from '@/components/FormSingUp'
import FormSuccess from '@/components/FormNotiSuccess'
import FormError from '@/components/FormNotiErrorServer'
export default {
  name: 'SingUp',
  components: {
    FormSingUp,
    FormSuccess,
    FormError
  }
}
</script>
