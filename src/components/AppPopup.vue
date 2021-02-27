<template>
  <div v-if="isUnsplash" class="flex flex-col justify-center h-full gap-4 p-4">
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
      <input
        type="checkbox"
        v-model="dimension"
        name="dimension"
        @change="storeData('dimension')"
      />
    </div>
    <div class="flex gap-4">
      <div class="w-1/2">
        <div>Width</div>
        <input
          type="number"
          v-model="width"
          name="width"
          @change="storeData('width')"
        />
      </div>
      <div class="w-1/2">
        <div>Height</div>
        <input
          type="number"
          v-model="height"
          name="height"
          @change="storeData('height')"
        />
      </div>
    </div>
    <div>
      <div>Image URL</div>
      <div class="content">
        {{ error || url }}
      </div>
    </div>
    <div>
      <div>Alternate text</div>
      <div class="content">
        {{ error || alt }}
      </div>
    </div>
    <div>
      <div>Credit</div>
      <div class="content">
        {{ error || credit }}
      </div>
    </div>
  </div>
  <div v-else class="flex items-center justify-center h-full p-4 my-32">
    <div class="font-mono text-xl">
      Please visit
      <a href="https://unsplash.com" alt="unsplash.com" target="_blank">
        Unsplash.com</a
      >
      and select an image to see all the actions available.
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

const options = {
  // You can set your default options here
}

Vue.use(Toast, options)

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
  data() {
    return {
      dimension: false,
      width: '1920',
      height: '1080',
      url: '',
      error: '',
      alt: '',
      credit: '',
      isUnsplash: false,
    }
  },
  async mounted() {
    const url = await this.sendMessage('getUrl')
    if (url === baseUrlWebUnsplash) {
      this.isUnsplash = true
    } else {
      this.isUnsplash = false
    }
    const width = await this.getFromStorage('width')
    const height = await this.getFromStorage('height')
    const dimension = await this.getFromStorage('dimension')
    this.width = width?.width || this.width
    this.height = height?.height || this.height
    this.dimension = dimension?.dimension || this.dimension
  },
  methods: {
    getFromStorage(key) {
      return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], (data) => {
          resolve(data)
        })
      })
    },
    setToStorage(key, value) {
      chrome.storage.sync.set({ [key]: value }, function () {
        console.log('Value is set to ' + value)
      })
    },
    storeData(key) {
      if (key === 'width') {
        this.setToStorage('width', this.width)
      } else if (key === 'height') {
        this.setToStorage('height', this.height)
      } else if (key === 'dimension') {
        this.setToStorage('dimension', this.dimension)
      }
    },
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
        this.$toast.success('Link has been copied.')
      } else {
        this.$toast.info('Please copy the link.')
      }
    },
  },
}
</script>

<style scoped>
button {
  @apply w-1/2 h-12 text-white transition duration-500 ease-in-out;
}

input[type='number'] {
  @apply text-white bg-coolGray-600 w-full;
}

.content {
  min-height: 40px;
  @apply flex items-center p-2 overflow-auto border border-gray-500 select-all;
}
</style>
