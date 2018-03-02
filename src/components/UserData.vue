<template lang="pug">
section.single
  .single__inner
    //- User Profile
    h1.single__title Datos Personales
    //- data User
    .user-data
      .user-data__avatar
        img.user-data__img(src="/", alt="Avatar Damarys Saldaña")
      .user-data__name Damarys Saldaña
      ul.user-data__notify
        li.user-data__value 20
        li.user-data__value 0
        li.user-data__value 0
        li.user-data__track 349 Seguidores
        li.user-data__track 45 Siguiendo
</template>

<script>
export default {
  name: 'UserData'
}
</script>
