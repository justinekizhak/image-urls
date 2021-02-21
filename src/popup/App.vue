<template>
  <div class="flex flex-col h-full text-white bg-coolGray-700">
    <div class="p-4 border-b-2 border-gray-500">
      <h1 class="font-mono text-2xl">Get Unsplash image</h1>
    </div>
    <app-popup />
    <div class="p-4 font-mono text-lg">
      Created by
      <a
        href="https://justine.kizhak.com"
        alt="Justine Kizhakkinedath"
        target="_blank"
        >Justine Kizhakkinedath</a
      >
    </div>
  </div>
</template>

<script>
import AppPopup from '@/components/AppPopup.vue'

export default {
  name: 'App',
  components: { AppPopup },
}
</script>

<style>
html {
  width: 400px;
  height: 550px;
}

a {
  @apply transition duration-500 ease-in-out border-b-4 border-blue-500 hover:bg-blue-500  hover:text-white;
}
</style>
