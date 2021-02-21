<template>
  <div class="flex flex-col justify-center h-full gap-4 p-4">
    <div class="flex w-full gap-4">
      <button @click="clearData" class="bg-red-500 hover:bg-red-700">
        Clear
      </button>
      <button @click="getAllData" class="bg-blue-500 hover:bg-blue-700">
        Get Image
      </button>
    </div>
    <div class="flex items-center h-10 gap-4">
      <div class="w-1/2">Dimension</div>
      <input type="checkbox" v-model="dimension" name="dimension" />
    </div>
    <div class="flex gap-4">
      <div class="w-1/2">
        <div>Width</div>
        <input type="number" v-model="width" name="width" class="w-full" />
      </div>
      <div class="w-1/2">
        <div>Height</div>
        <input type="number" v-model="height" name="height" class="w-full" />
      </div>
    </div>
    <div class="">
      <div>Image URL</div>
      <div class="content">
        {{ error || url }}
      </div>
    </div>
    <div>
      <div>Credit</div>
      <div class="content">
        {{ error || credit }}
      </div>
    </div>
  </div>
</template>

<script>
const baseUrlApiUnsplash = 'https://source.unsplash.com'
const baseUrlWebUnsplash = 'https://unsplash.com'

// const lorem =
//   'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis dicta non nobis commodi placeat impedit ducimus deserunt ex amet, dolorem reiciendis. Cum, quisquam? Sit fugiat, iusto sequi dicta labore provident.'

function copy(text) {
  const input = document.createElement('input')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

export default {
  name: 'HelloWorld',
  data() {
    return {
      dimension: true,
      width: '1900',
      height: '400',
      url: '',
      error: '',
      alt: '',
      credit: '',
    }
  },
  methods: {
    sendMessage(action) {
      return new Promise((resolve, reject) => {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { action },
              function (response) {
                resolve(response)
              }
            )
          }
        )
      })
    },
    getAllData() {
      this.getCurrentUrl()
      this.getMetadata()
    },
    async getMetadata() {
      const alt = await this.sendMessage('getAlt')
      const title = await this.sendMessage('getTitle')
      const creator = await this.sendMessage('getCreator')
      const creatorUrl = `${baseUrlWebUnsplash}/${creator}`

      this.alt = alt

      this.credit = `<a href="${creatorUrl}">${title}</a>`
    },
    async getCurrentUrl() {
      const imageUrl = await this.sendMessage('getImageUrl')
      if (!imageUrl) {
        this.error = 'Image not found'
        return
      }
      this.error = ''
      const d = imageUrl.split('/')
      const photoId = d[d.length - 1]
      const dimension = () => {
        if (this.dimension) {
          return `/${this.width}x${this.height}`
        }
        return ''
      }
      const url = `${baseUrlApiUnsplash}/${photoId}${dimension()}`
      this.url = url
      this.copyUrl()
    },
    clearData() {
      this.url = ''
      this.credit = ''
      this.error = ''
    },
    copyUrl() {
      const t = copy(this.url)
      if (t) {
        console.log('Link has been copied')
      } else {
        console.error('Not copied')
      }
    },
  },
}
</script>

<style scoped>
button {
  @apply w-1/2 h-12 text-white transition duration-500 ease-in-out;
}

.content {
  min-height: 40px;
  @apply flex items-center p-2 overflow-auto border border-gray-500 select-all;
}
</style>
