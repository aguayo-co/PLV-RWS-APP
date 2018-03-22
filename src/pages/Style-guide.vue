<template lang="pug">
.layout-page
  .layout-inner
    .sg-page
      .sg-head
        h1.title__main Guía de estilos
        h2.title Contenidos Generales
      .sg-box
        .sg-box__row
          h3.title_subhead Elementos transversales
          Titles
          TextElements
          Forms

</template>

<script>
import Titles from '@/components/guidestyle/titles'
import TextElements from '@/components/guidestyle/TextElements'
import Forms from '@/components/guidestyle/Forms'

export default {
  name: 'Style-guide',
  components: {
    Titles,
    TextElements,
    Forms
  }
}
</script>
