<template>
  <section class="main">
    <spicts-header />
    <div>
      <app-logo class="logo" />
      <div class="content">
        <h3>ギャラリー</h3>
        <p>過去に作成されたモザイクアートです</p>
        <p>モザイク”アート”ですので、他の人が作成したものも楽しんではいかがでしょうか？</p>
        <p>また、モザイクアートは1日に一度自動で作成され更新されていきます。</p>
      </div>
      <div>
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
      </div>
      <div>
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
      </div>
      <div>
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
        <img src="~/assets/logo.png" height="300" width="300" />
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
      return chunk(this.urls, 3);
    }
  },
  methods: {
    setImage: function(output) {
      this.hasImage = true;
      this.image = output;
    },
    postSpictsImage() {
      this.$store.dispatch("spictsImage/uploadSpictsImage", {
        file: this.image
      });
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

