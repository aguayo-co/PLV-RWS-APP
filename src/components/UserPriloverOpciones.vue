<template lang="pug">
.single__step
  UserVacaciones
  .box
    .box-data
      .box-data__row
        p.box-data__txt.i-credits Tus créditos
        p.box-data__val 2100
      .box-data__row
        a.btn.btn_solid(href='#') Convertir en dinero
      .box-data__row
        a.link_underline(href='#') Ver historial

</template>

<script>
import UserVacaciones from '@/components/UserVacaciones'

export default {
  name: 'UserPriloverOpciones',
  components: {
    UserVacaciones
  }
}
</script>
