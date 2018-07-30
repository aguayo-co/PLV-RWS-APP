<template lang="pug">
//- Para paginar elementos se debe pasar a Pager la respuesta original
//- del primer llamado a el API cómo "v-model". De esta se consigue la información para
//- seguir haciendo llamados a cualquier ruta paginada.
//- El paginador se encarga de hacer los llamados y una vez obtiene la respuesta
//- se actializa en el componente padre la propiedad pasada.
//-
//- Adicionalmente se puede pasar una propiedad :auth indicando si la ruta
//- debe hacerse de forma autenticada o no. Esta propiedad es opcional.
//- por defecto se hacen llamados NO autenticados.
//-
//- Ejemplo: Pager(v-model="pagination", :auth="true")

Loader(v-if="infinite && loading")
p.btn__wrapper(
  v-else-if="infinite")
  span(v-if="objects.length === 0") No hay resultados a mostrar
  span(v-else-if="currentPage === pagination.last_page") Ya cargaste todos los resultados
  button.btn.i-send(
    v-else-if="!mqMobile"
    @click='currentPage++') Ver más
ul.pagination.pagination_bottom(v-else-if="pagination")
  li.pagination__select
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
