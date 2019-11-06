<template>
  <section class="main">
    <spicts-header />
    <div>
      <app-logo class="logo" />

      <div class="content">
        <h3>Spictsへようこそ</h3>
        <p>Spictsはモザイクアートを誰でも簡単に作成できるサービスです。</p>
        <p>いろいろな人がアップロードした画像を組み合わせてモザイクアートを作成することができます。</p>
        <p>また、モザイクアートは1日に一度自動で作成され更新されていきます。</p>
      </div>
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

