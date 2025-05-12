<template>
  <MainLayout>
    <div class="mainlayout">
      <HeroSection />
      <LayananSection />
      <EstimasiBiayaSection />
      <ProjectSection />
      <TutorialSection />
      <TentangKamiSection />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/views/layouts/main/MainLayout.vue";
import HeroSection from "@/components/main/HeroSection.vue";
import LayananSection from "@/components/main/LayananSection.vue";
import EstimasiBiayaSection from "@/components/main/EstimasiBiayaSection.vue";
import ProjectSection from "@/components/main/ProjectSection.vue";
import TutorialSection from "@/components/main/TutorialSection.vue";
import TentangKamiSection from "@/components/main/TentangKamiSection.vue";

export default {
  name: "MainPage",
  components: {
    MainLayout,
    HeroSection,
    LayananSection,
    EstimasiBiayaSection,
    ProjectSection,
    TutorialSection,
    TentangKamiSection,
  },
};
</script>

<style>
.mainlayout {
  min-height: 200vh;
  /* background-color: rgba(0, 0, 0, 0.05); bantu visualisasi */
}
</style>
