<template>
  <div>
    <MainNavbar />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
import MainNavbar from "@/components/main/MainNavbar.vue";
import MainFooter from "@/components/main/MainFooter.vue";

export default {
  name: "MainLayout",
  components: {
    MainNavbar,
    MainFooter,
  },
};
</script>

<style></style>
