<template>
  <div>
    <app-popup />
  </div>
</template>

<script>
// @ is an alias to /src
import AppPopup from '@/components/AppPopup.vue'

export default {
  name: 'Home',
  components: {
    AppPopup,
  },
}
</script>
