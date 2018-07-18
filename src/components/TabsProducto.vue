<template lang="pug">
.tabs
  nav.filter(v-if="mqMobile")
    a.filter__btn(href="#", @click.prevent='tabsMobile = true') {{ tabs[activeTab].title }}
    transition(name='slide-left')
        ul.filter__list(
        v-show="tabsMobile")
          li.filter__select_header.i-close(@click.prevent='tabsMobile = false') Sección
          li.filter__select(v-for="info, tab in tabs" @click.prevent="activeTab = tab") {{ info.title }}
  nav.tabs__nav(v-if="mqDesk")
    .tabs__inner
      ul.tabs__nav-list
        li.tabs__nav-item(v-for="info, tab in tabs")
          a.tabs__nav-link(
            @click.prevent="activeTab = tab",
            :class="{tabActive: activeTab === tab}") {{ info.title }}
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
                .slot__bar(
                  v-if="!user.vacation_mode && product.status < 30"
                  :class="{ 'slot__product-actions_status': product.status < 10 }")
                  .slot__product-actions.slot__actions_border(
                    v-if="product.sale_price !== product.price || product.status < 10")
                    span.slot__status(v-if="product.status < 10") {{ product.status | product_status }}
                    span.slot__status(v-if="product.sale_price !== product.price") {{ product | discount }}% Off
                  .slot__product-actions
                    router-link.slot__actions-link.i-edit-line(
                      :to="{ name: 'editar-producto', params: { productId: product.id }, query: { redirect: $route.fullPath }}")
                      transition(name='toggle-scale')
                        p.slot__tooltip Editar producto
                    a.slot__actions-link.i-hide(
                      v-if="product.status >= 10 && product.status < 20"
                      @click.prevent="hideProduct(product)")
                      transition(name='toggle-scale')
                        p.slot__tooltip Ocultar producto
                    a.slot__actions-link.i-view(
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
                .slot__group_price
                  .slot__price_through(v-if="product.sale_price !== product.price") ${{ product.price | currency }}
                  .slot__price ${{ product.sale_price | currency }}

      Pager(v-if="products" v-model="pagination", :auth="true", v-on:paging="loading = $event")
</template>

<script src="./js/TabsProducto.js"></script>
