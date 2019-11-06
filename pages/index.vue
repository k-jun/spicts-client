<template>
  <section class="main">
    <spicts-header />
    <div>
      <app-logo class="logo" />
      <h4>Spictsへようこそ</h4>
      <p>Spictsは複数の画像からモザイクアートをつくるサービスです。</p>
      <p>サーバーに保存されている画像、自分でアップロードした画像を用いてモザイクアートを作成することができます。</p>
      <p>Galleryからは過去に作成されたモザイクアートを見ることができます。</p>
      <p>モザイクアートは一日に一度自動で生成され更新されていきます。</p>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import SpictsHeader from "~/components/header.vue";
import Vue from "vue";
import { chunk } from "lodash";

export default {
  name: "Home",
  components: {
    AppLogo,
    SpictsHeader
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

