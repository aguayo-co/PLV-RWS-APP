<template lang="pug">
.layout-slot
  .content-slot
    .content-slot__inner
      //- Formulario recuperar PASS
      FormPass
</template>

<script>
import FormPass from '@/components/FormPass'
export default {
  name: 'PasswordRequest',
  components: {
    FormPass
  },
  data () {
    return {
    }
  },
  computed: {
  },
  created () {
  }
}
</script>
