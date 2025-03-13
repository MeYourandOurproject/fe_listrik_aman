<template>
  <!-- <Navbar /> -->
  <!-- <div class="landing"> -->
  <HeroSection />
  <LayananSection />
  <EstimasiBiayaSection />
  <ProjectSection />
  <!-- <ArtikelSection id="artikel" /> -->
  <TutorialSection />
  <TentangKamiSection />
  <!-- </div> -->
</template>

<script>
// import Navbar from "../components/NavbarLayout.vue";
import HeroSection from "../components/HeroSection.vue";
import LayananSection from "@/components/LayananSection.vue";
import EstimasiBiayaSection from "@/components/EstimasiBiayaSection.vue";
import ProjectSection from "@/components/ProjectSection.vue";
// import ArtikelSection from "@/components/ArtikelSection.vue";
import TutorialSection from "@/components/TutorialSection.vue";
import TentangKamiSection from "@/components/TentangKamiSection.vue";
// import Footer from "@/components/FooterLayout.vue";

export default {
  components: {
    // Navbar,
    // Footer,
    HeroSection,
    LayananSection,
    EstimasiBiayaSection,
    ProjectSection,
    // ArtikelSection,
    TutorialSection,
    TentangKamiSection,
  },
};
</script>

<style>
.landing {
  min-height: 200vh;
  /* margin-top: 100px; */
}
</style>
