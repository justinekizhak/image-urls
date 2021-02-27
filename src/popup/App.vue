<template>
  <div class="flex flex-col h-full text-white bg-coolGray-700">
    <div
      class="flex items-center justify-between p-4 border-b-2 border-gray-500"
    >
      <h1 class="font-mono text-2xl">Get Unsplash image</h1>
      <a
        href="https://github.com/justinekizhak/image-urls"
        target="_blank"
        class="border-0 hover:bg-transparent"
      >
        <help-icon
          class="w-5 transition-transform duration-300 ease-in-out hover:scale-125 transform-gpu"
        />
      </a>
    </div>
    <app-popup />
    <div class="p-4 font-mono text-lg border-t border-gray-500">
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
import HelpIcon from '@/components/HelpIcon'

export default {
  name: 'App',
  components: { AppPopup, HelpIcon },
}
</script>

<style>
html {
  width: 400px;
  height: 100%;
}

a {
  @apply transition duration-500 ease-in-out border-b-4 border-blue-500 hover:bg-blue-500  hover:text-white;
}
</style>
