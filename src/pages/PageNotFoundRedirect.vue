 <template lang="pug">
</template>

<script>
export default {
  name: 'PageNotFoundRedirect',
  created () {
    window.location.href = '/not-found'
  }
}
</script>
