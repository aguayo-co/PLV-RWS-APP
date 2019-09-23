 <template lang="pug">
.layout-page
  .layout-inner
    .alert-msg.alert-msg_center
      p ¡Ups! Esta página no se encuentra en Prilov.
    .alert-msg_spacing
      router-link.btn.btn_solid(
        :to="{ name: 'home' }",
        title="Ir a Vitinear") Volver al Shop
</template>

<script>
export default {
  name: 'PageNotFound'
}
</script>
