<template>
  <section class="main">
    <spicts-header />

    <div>
      <app-logo class="logo" />
      <div class="content">
        <h3>画像をアップロード</h3>
        <p>フィルターなどは存在しませんが、不適切な画像のアップロードは控えてください。</p>
        <p>全ての利用者のみなさんが良識ある、人だと信じています。</p>
        <p>アップロードされた全ての画像は24:00をすぎた時点で自動的に削除されます。注意してください。</p>
      </div>
      <div class="links">
        <br />
        <div>{{ message }}</div>
        <div v-if="filesURL">
          <div v-for="(image, index) in createChunk" :key="index">
            <img :src="image[0]" height="300" width="300" />
            <img v-if="image.length > 1" :src="image[1]" height="300" width="300" />
            <img v-if="image.length > 2" :src="image[2]" height="300" width="300" />
          </div>
        </div>

        <input multiple="multiple" type="file" @change="uploadFiles" />

        <b-button :disabled="files.length === 0" @click="postSpictsImage">Upload</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import SpictsHeader from "~/components/header.vue";
import Vue from "vue";
import { mapState } from "vuex";
import { chunk } from "lodash";

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
    };
  },
  async created() {
    await this.$store.dispatch("spictsImage/getSpictsPieceImage");
    this.urls = this.$store.state.spictsImage.all;
  },
  computed: {
    createChunk() {
      return chunk(this.filesURL, 3);
    },
    message() {
      return this.$store.state.spictsImage.message;
    }
  },
  methods: {
    async uploadFiles(event) {
      for (let i = 0, item; (item = event.target.files[i]); i++) {
        // save as fileURL
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = item => {
          this.filesURL.push(item.target.result);
        };
        // save as file
        this.files.push(item);
      }
    },
    postSpictsImage() {
      this.files.map(file =>
        this.$store.dispatch("spictsImage/uploadSpictsPieceImage", { file })
      );
      this.files = [];
      this.filesURL = [];
    }
  }
};
</script>

<style scoped>
.main {
  width: inherit;
  margin: 0;
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.logo {
  margin: 50px;
}
</style>

