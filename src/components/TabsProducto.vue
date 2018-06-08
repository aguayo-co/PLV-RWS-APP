<template lang="pug">
.tabs
  nav.tabs__nav
    p.tabs__inner
      ul.tabs__nav-list
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'published'",
            :class="{tabActive: activeTab === 'published'}") Prendas Publicadas
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'sold'",
            :class="{tabActive: activeTab === 'sold'}") Productos vendidos
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'hidden'",
            :class="{tabActive: activeTab === 'hidden'}") Productos ocultos
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'rejected'",
            :class="{tabActive: activeTab === 'rejected'}") Productos rechazados
  .tabs__content
    .tab
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-if="loading")
          p Estamos cargando tus productos.
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-else-if="activeTab !== 'published' && !products")
          p No tienes productos por aquí!
      .alert-msg.alert-msg_center.alert-msg_top.i-alert(v-else-if="activeTab === 'published' && user.vacation_mode")
          p Tienes habilitado el modo vacaciones. Todos tus productos están deshabilitados.
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-else-if="activeTab === 'published' && !products")
          p Aún no hay productos en tu closet <router-link class="link_underline" :to="{ name: 'publicar-venta' }">Publica tu primer producto</router-link>
      .product-grid.product-grid_small(v-else)
        article.slot.slot_grid(
          v-for='product in products',
          :class="{ 'slot_disabled' : user.vacation_mode || product.status < 10 }")
          a.slot__ico.i-heart(
            v-if="activeTab === 'published'"
            title='Agrega a Favoritos') Agregar a Favoritos
          .slot__product-inner
            router-link.slot__product(
              :to="{ name: 'product', params: { slug: product.title + '__' + product.id }}",
              :title='product.title')
              img.slot__img(
                :src="product.images[0]",
                :alt="'Foto de ' + product.title")
              //- Eliminar producto
              .slot__product-actions(v-if="mqMobile && !user.vacation_mode")
                a.slot__actions-link.i-edit-line(href="#")
                a.slot__actions-link.i-trash(href="#")
              .slot__product-actions(
                :class="{ 'slot__product-actions_status': product.status < 10 }",
                v-if="mqDesk && !user.vacation_mode && product.status < 30")
                span.slot__status(v-show="product.status < 10") {{ product.status | product_status }}
                router-link.slot__actions-link.i-edit-line(:to="{ name: 'editar-producto', params: { productId: product.id }}")
                  transition(name='toggle-scale')
                    p.slot__tooltip Editar producto
                a.slot__actions-link.i-trash(href="#")
                  transition(name='toggle-scale')
                    p.slot__tooltip Eliminar producto
              //- Producto en proceso de compra
              //- .slot__product-alert
              //-   p.slot__alert-txt  Este producto está siendo comprado.
              //-title/dimensions
            .slot__lead
              .slot__title {{ product.title }}
              .slot__size(
                v-if="product.size")
                .slot__size-txt {{ product.size.name }}

            //- brand/price
            .slot__info
              .slot__brand {{ product.brand.name }}
              .slot__price ${{ product.price | currency }}

          //- user: picture/first_name/last_name
          a.slot__user(
            href='#',
            :title='product.user.first_name')
            .slot__user-img
              .slot__avatar
                img.slot__picture(
                  v-if='product.user.picture'
                  :src='product.user.picture',
                  :alt='product.user.first_name')
                span.tool-user__letter(v-else) {{ product.user.first_name.charAt(0) }}
            .slot__user-info
              .slot__prilover {{ product.user.first_name }} {{ product.user.last_name }}
              .group(v-if='product.user.groups.length > 0')
                .slot__group.i-it-girl(
                  v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
                .slot__group.i-star-on(
                  v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
      Pager(v-if="products" v-model="pagination", :auth="true", v-on:paging="paging($event)")
</template>

<script src="./js/TabsProducto.js"></script>
