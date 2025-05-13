<template>
  <div>
    <ArtikelNavbar />
    <router-view />
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
