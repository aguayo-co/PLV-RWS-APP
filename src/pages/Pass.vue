<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario de registro
      FormPass(
        v-if="recoverSuccess == false")
      //- NotiSuccess
      FormSuccess(v-else)

</template>

<script>
import FormPass from '@/components/FormPass'
import FormSuccess from '@/components/FormNotiSuccessPass'
export default {
  name: 'Pass',
  components: {
    FormPass,
    FormSuccess
  },
  data () {
    return {
      recoverSuccess: false,
      userEmail: ''
    }
  },
  methods: {
    setRecoverSuccess () {
      this.recoverSuccess = true
    }
  }
}
</script>
