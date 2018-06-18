<template lang="pug">
span.saving
  span .
  span .
  span .
  span .
</template>

<script>
export default {
  name: 'Dots'
}
</script>

<style scoped>
.saving.dark {
  color: black;
}

.saving span {
  animation-name: blink;
  animation-duration: 1.6s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.saving span:nth-child(2) {
  animation-delay: .2s;
}

.saving span:nth-child(3) {
  animation-delay: .4s;
}

.saving span:nth-child(4) {
  animation-delay: .6s;
}

@keyframes blink {
  0% {
    opacity: .2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
}
</style>
