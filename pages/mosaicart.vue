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
      <div>
        <img src='https://s3-ap-northeast-1.amazonaws.com/spicts/mosaic_art/spictsMosaicArt1.png' height="300" width="300" >
        <img src='https://s3-ap-northeast-1.amazonaws.com/spicts/mosaic_art/spictsMosaicArt2.png' height="300" width="300" >
        <img src='https://s3-ap-northeast-1.amazonaws.com/spicts/mosaic_art/spictsMosaicArt3.png' height="300" width="300" >
      </div>
      <div>
        <img src='https://s3-ap-northeast-1.amazonaws.com/spicts/mosaic_art/spictsMosaicArt4.png' height="300" width="300" >
        <img src='https://s3-ap-northeast-1.amazonaws.com/spicts/mosaic_art/spictsMosaicArt5.png' height="300" width="300" >
        <img src='https://s3-ap-northeast-1.amazonaws.com/spicts/mosaic_art/spictsMosaicArt6.png' height="300" width="300" >
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import Vue from "vue";
import { mapState } from 'vuex'
import { chunk } from 'lodash'

export default {
  name: "ImageUpload",
  components: {
    AppLogo
  },
  data: () => {
    return {
      files: [],
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
      return chunk(this.urls, 3)
    }
  },
  methods: {
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
    },
    postSpictsImage() {
      this.$store.dispatch('spictsImage/uploadSpictsImage', { file: this.image })
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

