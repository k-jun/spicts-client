<template>
  <section class="container">
    <div>
      <app-logo/>
      <spicts-header />
      <div class="links">
        <br>
        <div>{{ message }}</div>
        <div v-if="filesURL">
          <div v-for="(image, index) in createChunk" :key="index">
            <img :src="image[0]" height="300" width="300" />
            <img v-if="image.length > 1" :src="image[1]" height="300" width="300" />
            <img v-if="image.length > 2" :src="image[2]" height="300" width="300" />
          </div>
        </div>
        
        <input multiple="multiple" type="file" @change="uploadFiles"/>
        <button :disabled="files.length === 0" @click="postSpictsImage">Submit</button>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import SpictsHeader from '~/components/header.vue'
import Vue from "vue";
import { mapState } from 'vuex'
import { chunk } from 'lodash'

export default {
  name: "ImageUpload",
  components: {
    AppLogo,
    SpictsHeader
  },
  data: () => {
    return {
      files: [],
      filesURL: [],
      msg: "Vue Image Upload and Resize Demo",
      hasImage: false,
      image: null,
      urls: []
    }
  },
  async created() {
    await this.$store.dispatch('spictsImage/getSpictsPieceImage')
    this.urls = this.$store.state.spictsImage.all
  },
  computed: {
    createChunk() {
      return chunk(this.filesURL, 3)
    },
    message() {
      return this.$store.state.spictsImage.message
    }
  },
  methods: {
    async uploadFiles (event) {
      for (let i = 0, item; item = event.target.files[i]; i++) {
        // save as fileURL
        let reader = new FileReader
        reader.readAsDataURL(item)
        reader.onload = (item) => {
          this.filesURL.push(item.target.result)
        }
        // save as file
        this.files.push(item)
      }
    },
    postSpictsImage() {
      this.files.map(file => this.$store.dispatch('spictsImage/uploadSpictsPieceImage', { file }))
      this.files = []
      this.filesURL = []
    },
  }
}
</script>

<style>
#fileInput {
  display: none;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

