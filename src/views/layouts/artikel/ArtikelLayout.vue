<template>
  <div>
    <ArtikelNavbar />
    <div class="layout">
      <router-view />
    </div>
    <ArtikelFooter />
  </div>
</template>

<script>
import ArtikelNavbar from "@/components/artikel/ArtikelNavbar.vue";
import ArtikelFooter from "@/components/artikel/ArtikelFooter.vue";

export default {
  name: "ArtikelLayout",
  components: {
    ArtikelNavbar,
    ArtikelFooter,
  },
};
</script>

<style>
.layout{
  min-height: 100vh;
}
</style>