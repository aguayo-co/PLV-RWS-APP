<template lang="pug">
//- Sugerencias de búsqueda a nivel de:
    marcas, categorías, nombres de Prilovers.
form.seacrh(action='', method='GET')
  .search__row
    input.seacrh__input#seacrhMain(type='text', name='search', placeholder='¿Qué buscas?')
    input.seacrh__btn(type='submit', value='')
</template>

<script>
export default {
  name: 'PageHeaderSearch'
}
</script>
