<template>
  <section class="container">
    <div>
      <app-logo/>
      <spicts-header />
      <br>
      <br>
      <h4>Spictsへようこそ</h4>
      <p>Spictsは複数の画像からモザイクアートをつくるサービスです。</p>
      <p>サーバーに保存されている画像、自分でアップロードした画像を用いてモザイクアートを作成することができます。</p>
      <p>Galleryからは過去に作成されたモザイクアートを見ることができます。</p>
      <p>モザイクアートは一日に一度自動で生成され更新されていきます。</p>
    </div>
  </section>
  
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import SpictsHeader from '~/components/header.vue'
import Vue from "vue";
import { chunk } from 'lodash'

export default {
  name: "Home",
  components: {
    AppLogo,
    SpictsHeader
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

