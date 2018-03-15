<template lang="pug">
  ul.steps__list
    li.steps__item.steps__item_current
      span.steps__bullet.i-ok 1
      span.steps__label Producto
    li.steps__item
      span.steps__bullet.i-ok  2
      span.steps__label Descripción

</template>

<script>

export default {
  name: 'Steps'
}
</script>
