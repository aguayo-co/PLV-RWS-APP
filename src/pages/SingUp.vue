<template lang="pug">
.layout-slot
  .content-slot
    //- Formulario de registro
    FormSingUp
    //- Noti OK
    FormSuccess
    //- Noti Error

</template>

<script>
import FormSingUp from '@/components/FormSingUp'
import FormSuccess from '@/components/FormSuccess'
export default {
  name: 'SingUp',
  components: {
    FormSingUp,
    FormSuccess
  }
}
</script>
