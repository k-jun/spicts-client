<template>
  <section class="container">
    <div>
      
      <app-logo/>
      <div class="links">
        <div>
          <a href="/">HOME</a>
          <a href="/images">IMAGES</a>
          <a href="/mosaicart">GALLERY</a>
        </div>
      </div>
      <div class="links">
        <div v-if="filesURL">
          <div v-for="(image, index) in createChunk" :key="index">
            <img :src="image[0]" height="300" width="300" @click="removeFile(index, 0)"/>
            <img :src="image[1]" height="300" width="300" @click="removeFile(index, 1)"/>
            <img :src="image[2]" height="300" width="300" @click="removeFile(index, 2)"/>
          </div>
        </div>
        
        <input multiple="multiple" type="file" @change="uploadFiles"/>
        <button @click="postSpictsImage">Submit</button>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Vue from "vue";
import { chunk } from 'lodash'

export default {
  name: "ImageUpload",
  components: {
    AppLogo
  },
  data: () => {
    return {
      files: [],
      filesURL: [],
    }
  },
  computed: {
    createChunk() {
      return chunk(this.filesURL, 3)
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
      this.files.map(file => {
        console.log("file uploading...")
        this.$store.dispatch('spictsImage/uploadSpictsPieceImage', { file })
      })
    },
    removeFile(index, order) {
      this.filesURL.splice(index * 3 + order, 1)
      this.files.splice(index * 3 + order, 1)
      console.log(this.files)
    }
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

