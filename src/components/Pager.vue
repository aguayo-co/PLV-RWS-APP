<template lang="pug">
//- Este paginador sirve como centro de carga de cualquier modelo
//- paginado desde Laravel. Las propiedades que acepta son:
//-
//- baseUrl: url para hacer la carga de objetos.
//- forcedParams: parámetros que siempre se mandan al api.
//- idKey: nombre de la llave para usar cómo ID en los objetos cargados.
//- infinite: Define si es paginado o infinito.
//- auth: Define si el llamado es autenticado o anónimo.
//-
//- La propiedad a usar cómo v-model es "objects".
//-
//- Manda al api todos los parámetros que encuentre en la URL.
//-
//- Emite "paging" cuando se están cargando objetos.
//-
//- Hace un llamado cuando detecta cambios en la URL.

Loader(v-if="infinite && loading")
p.btn__wrapper(
  v-else-if="infinite")
  span(v-if="objects.length === 0") No hay resultados a mostrar
  span(v-else-if="currentPage === pagination.last_page") Ya cargaste todos los resultados
  button.btn.i-send(
    v-else-if="!mqMobile"
    @click='currentPage++') Ver más
ul.pagination.pagination_bottom(v-else-if="pagination")
  li.pagination__select(
    v-if='!forcedParams || !forcedParams.items')
    select.form__select.form__select_small(
      name="numeroItems",
      v-model='perPage')
        option(value="12") 12
        option(value="24") 24
        option(value="33") 33
        option(value="42") 42
  li.pagination__item(
    v-if='1 < currentPage')
    a.pagination__arrow.pagination__arrow_prev.i-back(
      @click.prevent="currentPage--"
      href="#")
  li.pagination__item {{ currentPage }}
  li.pagination__item.pagination__item_txt de {{ pagination.last_page }}
  li.pagination__item(
      v-if='currentPage < pagination.last_page')
    a.pagination__arrow.pagination__arrow_next.i-next(
      @click.prevent="currentPage++"
      href="#")
</template>

<script src="./js/Pager.js"></script>
