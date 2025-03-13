<template>
  <div id="app">
    <Navbar />
    <LandingPage />
    <Footer />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import LandingPage from "./views/LandingPage.vue";

import Navbar from "@/components/NavbarLayout.vue";
import Footer from "@/components/FooterLayout.vue";

export default {
  name: "App",
  components: {
    LandingPage,
    Navbar,
    Footer,
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
