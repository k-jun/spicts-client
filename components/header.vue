<template>
  <!-- <div class="links">
    <div>
      <a href="/">Home</a>
      <a href="/create">Create MosaicArt</a>
      <a href="/mosaicart">Gallery</a>
    </div>
  </div>-->
  <b-navbar class="header_container">
    <template slot="start">
      <b-navbar-item href="/">Spicts</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item href="/create">Create MosaicArt</b-navbar-item>
      <b-navbar-item href="/mosaicart">Gallery</b-navbar-item>
    </template>
  </b-navbar>
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
.header_container {
  width: 100%;
}
</style>

