<template lang="pug">
span.brand
  img.brand__logo(
    src='/static/img/brand-prilov.svg',
    alt='Prilov Compra. Usa. Vende')
  span.brand__typo
    strong.brand__name Prilov.com
    span.brand__tagline
      |  Compra. Usa. Vende.
</template>

<script>
export default {
  name: 'PageHeaderBrand'
}
</script>
