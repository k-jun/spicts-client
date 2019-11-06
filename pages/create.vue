<template>
  <section class="main">
    <spicts-header />
    <div>
      <app-logo class="logo" />

      <div class="content">
        <h3>モザイクアート作成</h3>
        <p>最初に選んだ画像が背景となるメイン画像になります。注意して選びましょう。また、画像は49(7×7)枚必要です</p>
        <p>もし、画像が49枚以下の場合にはSpictsが自動的に画像を選択してくれます。親切ですね。</p>
        <p>アップロードされた全ての画像は24:00をすぎた時点で自動的に削除されます。注意してください。</p>
      </div>

      <b-button>
        <a href="/addNewImage">画像を追加する</a>
      </b-button>
      <b-button
        :disabled="selectedImagePaths.length === 0"
        @click="open"
      >{{selectedImagePaths.length === 0 ? '画像が選択されていません' : '選んだ画像を確認する'}}</b-button>

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
      <br />
      <br />
      <br />
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
          <a
            :href="'https://s3-ap-northeast-1.amazonaws.com/spicts/' + createdMosaicArtPath"
            download
          >画像をダウンロード</a>
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
import AppLogo from "~/components/AppLogo.vue";
import SpictsHeader from "~/components/header.vue";
import Vue from "vue";
import { mapState } from "vuex";
import { chunk } from "lodash";
import "vue-thin-modal/dist/vue-thin-modal.css";

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
    };
  },
  async created() {
    await this.$store.dispatch("spictsImage/getSpictsPieceImage");
    this.imagePaths = this.$store.state.spictsImage.all;
  },
  computed: {
    createChunk() {
      return chunk(this.imagePaths, 4);
    },
    createChunkForConfirm() {
      return chunk(this.selectedImagePaths.slice(1), 7);
    },
    createdMosaicArtPath() {
      return this.$store.state.spictsImage.createdMosaicArtPath;
    }
  },
  methods: {
    async uploadFiles(event) {
      for (let i = 0, item; (item = event.target.files[i]); i++) {
        let reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = item => {
          this.filesURL.push(item.target.result);
        };
        this.files.push(item);
      }
    },
    postSpictsImage() {
      this.files.map(file =>
        this.$store.dispatch("spictsImage/uploadSpictsPieceImage", { file })
      );
      this.files = [];
      this.filesURL = [];
    },
    async createMosaicArt() {
      this.pending = true;
      await this.$store.dispatch("spictsImage/createMosaicArt", {
        mainImagePath: this.selectedImagePaths[0],
        pieceImagePaths: this.selectedImagePaths.slice(1)
      });
      this.pending = false;
    },
    selectImage(path) {
      const selectedIndex = this.selectedImagePaths.indexOf(path);
      if (selectedIndex === -1) {
        this.selectedImagePaths.push(path);
      } else {
        this.selectedImagePaths = this.selectedImagePaths.filter(
          item => item !== path
        );
      }
    },
    open() {
      this.$modal.push("confirmModal");
    },
    close() {
      this.$modal.pop();
    }
  }
};
</script>

<style scoped>
.main {
  width: inherit;
  margin: 0;
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

