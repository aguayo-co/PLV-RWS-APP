<template lang="pug">
//- Sugerencias de búsqueda a nivel de:
    marcas, categorías, nombres de Prilovers.
form.search(action='', method='GET')
  .search__row
    input.search__input#searchMain(type='text', name='search', placeholder='¿Qué buscas?')
    input.search__btn(type='submit', value='')
</template>

<script>
export default {
  name: 'PageHeaderSearch'
}
</script>
