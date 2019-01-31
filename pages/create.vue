<template>
  <section class="container">
    <div>
      <app-logo/>
      <spicts-header />
      <br>
      <p>最初に選択した画像がモザイクアートのメインの画像となります。</p>
      <p>選んだ画像が49枚未満の場合には自動的に画像が追加されます。</p>

      <div class="links">
        <a href="/addNewImage">画像を追加する</a>
      </div>

      <br>
      <button :disabled="selectedImagePaths.length === 0" @click="open">{{selectedImagePaths.length === 0 ? '画像が選択されていません' : '画像を確認する'}}</button>

      <div v-for="(urlBlock, index) in createChunk" :key="index">
        <img
          v-for="(path, innerIndex) in urlBlock"
          @click="selectImage(path)"
          :src="'https://s3-ap-northeast-1.amazonaws.com/spicts/'+ path"
          height="300"
          width="300"
          :class="selectedImagePaths.indexOf(path) !== -1 ? 'selected' : ''"
          :key="innerIndex"
        />
      </div>
      <br>
      <br>
      <br>
    </div>

    <modal name="confirmModal">
      <div class="basic-modal confirm_modal">
        <div v-if="createdMosaicArtPath">
          <div>画像が作成されました！！</div>
          <img
            :src="'https://s3-ap-northeast-1.amazonaws.com/spicts/' + createdMosaicArtPath"
            height="400"
            width="400"
          />
        </div>
        <div v-else>
          <div>これらの画像を使ってモザイクアートを作成しますか？</div>
          <img
            :src="'https://s3-ap-northeast-1.amazonaws.com/spicts/' + selectedImagePaths[0]"
            height="300"
            width="300"
          />
          <div v-for="(urlBlock, index) in createChunkForConfirm" :key="index">
            <img
              v-for="(path, innerIndex) in urlBlock"
              :src="'https://s3-ap-northeast-1.amazonaws.com/spicts/'+ path"
              :key="innerIndex"
              height="100"
              width="100"
            />
          </div>
        </div>

        <div v-if="createdMosaicArtPath">
          <a :href="'https://s3-ap-northeast-1.amazonaws.com/spicts/' + createdMosaicArtPath" download="">画像をダウンロード</a>
        </div>
        <div v-else>
          <button :disabled="pending" @click="createMosaicArt">{{ pending ? '作成中...' : '作成' }}</button>
          <button :disabled="pending" @click="close">キャンセル</button>
        </div>
        
        
      </div>
    </modal>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import SpictsHeader from '~/components/header.vue'
import Vue from "vue";
import { mapState } from 'vuex'
import { chunk } from 'lodash'
import 'vue-thin-modal/dist/vue-thin-modal.css'


export default {
  name: "ImageUpload",
  components: {
    AppLogo,
    SpictsHeader
  },
  data: () => {
    return {
      imagePaths: [],
      selectedImagePaths: [],
      pending: false
    }
  },
  async created() {
    await this.$store.dispatch('spictsImage/getSpictsPieceImage')
    this.imagePaths = this.$store.state.spictsImage.all
  },
  computed: {
    createChunk() {
      return chunk(this.imagePaths, 4)
    },
    createChunkForConfirm() {
      return chunk(this.selectedImagePaths.slice(1), 7)
    },
    createdMosaicArtPath() {
      return this.$store.state.spictsImage.createdMosaicArtPath
    }
  },
  methods: {
    async uploadFiles (event) {
      for (let i = 0, item; item = event.target.files[i]; i++) {
        let reader = new FileReader
        reader.readAsDataURL(item)
        reader.onload = (item) => {
          this.filesURL.push(item.target.result)
        }
        this.files.push(item)
      }
    },
    postSpictsImage() {
      this.files.map(file => this.$store.dispatch('spictsImage/uploadSpictsPieceImage', { file }))
      this.files = []
      this.filesURL = []
    },
    async createMosaicArt() {
      this.pending = true
      await this.$store.dispatch('spictsImage/createMosaicArt', { 
        mainImagePath: this.selectedImagePaths[0],
        pieceImagePaths: this.selectedImagePaths.slice(1),
      })
      this.pending = false
    },
    selectImage(path) {
      const selectedIndex = this.selectedImagePaths.indexOf(path)
      if (selectedIndex === -1) {
        this.selectedImagePaths.push(path)
      } else {
        this.selectedImagePaths = this.selectedImagePaths.filter(item => item !== path)
      }
    },
    open () {
      this.$modal.push('confirmModal')
    },
    close () {
      this.$modal.pop()
    }
  }
}
</script>

<style>
#fileInput {
  display: none;
}

.selected {
  opacity: 0.5;
}

.confirm_modal {
  width: 80%;
  text-align: center;
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

