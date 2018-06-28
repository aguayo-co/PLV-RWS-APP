<template lang="pug">
.tabs
  nav.tabs__nav
    p.tabs__inner
      ul.tabs__nav-list
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'published'",
            :class="{tabActive: activeTab === 'published'}") Publicados
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'sold'",
            :class="{tabActive: activeTab === 'sold'}") Vendidos
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'hidden'",
            :class="{tabActive: activeTab === 'hidden'}") Ocultos
        li.tabs__nav-item
          a.tabs__nav-link(
            @click.prevent="activeTab = 'rejected'",
            :class="{tabActive: activeTab === 'rejected'}") Rechazados
  .tabs__content
    .tab
      Loader(v-if="loading")
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-else-if="activeTab !== 'published' && !products")
          p No tienes productos por aquí!
      .alert-msg.alert-msg_center.alert-msg_top.i-alert(v-else-if="activeTab === 'published' && user.vacation_mode")
          p Tienes habilitado el modo vacaciones. Todos tus productos están deshabilitados.
      .alert-msg.alert-msg_center.alert-msg_top.i-smile(v-else-if="activeTab === 'published' && !products")
          p Aún no hay productos en tu closet <router-link class="link_underline" :to="{ name: 'publicar-venta' }">Publica tu primer producto</router-link>
      .product-grid.product-grid_small(v-else)
        article.slot.slot_grid(
          v-for='(product, index) in products',
          :class="{ 'slot_disabled' : user.vacation_mode || product.status < 10 }")
          Loader(v-if="product._loading")
          template(v-else)
            .slot__product-inner
              .slot-alert__content(v-if="modalDeleteId == index")
                p.slot-alert__txt.i-alert-info ¿Estás segura de eliminarlo?<br>
                  | No podrás volver a recuperar este producto
                .slot-alert__group-btn
                  button.slot-alert__btn.link_underline(
                    @click.stop="deleteProduct(product)") Sí
                  button.slot-alert__btn.link_underline(@click.stop="confirmAlert(null)") No
              router-link.slot__product(
                :to="{ name: 'product', params: { slug: product.title + '__' + product.id }}",
                :title='product.title')
                img.slot__img(
                  :src="product.images[0]",
                  :alt="'Foto de ' + product.title")
                //- Eliminar producto
                .slot__product-actions(
                  v-if="!user.vacation_mode && product.status < 30"
                  :class="{ 'slot__product-actions_status': product.status < 10 }")
                  span.slot__status(v-show="product.status < 10") {{ product.status | product_status }}
                  router-link.slot__actions-link.i-edit-line(:to="{ name: 'editar-producto', params: { productId: product.id }}")
                    transition(name='toggle-scale')
                      p.slot__tooltip Editar producto
                  a.slot__actions-link.i-view(
                    v-if="product.status >= 10 && product.status < 20"
                    @click.prevent="hideProduct(product)")
                    transition(name='toggle-scale')
                      p.slot__tooltip Ocultar producto
                  a.slot__actions-link.i-trash(
                    v-else-if="product.status === 20"
                    @click.prevent="unHideProduct(product)")
                    transition(name='toggle-scale')
                      p.slot__tooltip Habilitar producto
                  a.slot__actions-link.i-trash(@click.prevent="confirmAlert(index)")
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
                div(v-if="product.sale_price !== product.price") {{ product | discount }}% de descuento
                .through(v-if="product.sale_price !== product.price") ${{ product.price | currency }}
                .slot__price ${{ product.sale_price | currency }}

            //- user: picture/first_name/last_name
            // a.slot__user(
            //   href='#',
            //   :title='product.user.first_name')
            //   .slot__user-img
            //     .slot__avatar
            //       img.slot__picture(
            //         v-if='product.user.picture'
            //         :src='product.user.picture',
            //         :alt='product.user.first_name')
            //       span.tool-user__letter(v-else) {{ product.user.first_name.charAt(0) }}
            //   .slot__user-info
            //     .slot__prilover {{ product.user.first_name }} {{ product.user.last_name }}
            //     .group(v-if='product.user.groups.length > 0')
            //       .slot__group.i-it-girl(
            //         v-if='product.user.groups[0].slug === "itgirl"') It <span class="txt_brand">girl</span>
            //       .slot__group.i-star-on(
            //         v-if='product.user.groups[0].slug === "priloverstar"') Prilover <span class="txt_brand">Star</span>
      Pager(v-if="products" v-model="pagination", :auth="true", v-on:paging="loading = $event")
</template>

<script src="./js/TabsProducto.js"></script>
