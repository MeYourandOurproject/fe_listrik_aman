<template>
  <div class="container-fluid py-5 project-section">
    <div class="container d-flex align-items-center justify-content-center">
      <h1 class="estimasi-title fw-bold" id="project">Project Kami</h1>
    </div>
    <div class="container project mt-5">
      <div class="grid">
        <div class="grid-sizer"></div>
        <!-- Untuk layout kolom -->
        <div class="grid-item" v-for="(item, index) in items" :key="index">
          <div class="image-container">
            <img :src="item.image" alt="Gambar" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded"; // Tambahkan ini
import pj1Images from "@/assets/pj1.jpg";
import boxpanelImage from "@/assets/box-panel.jpg";
import earthTesterImage from "@/assets/earth-tester.jpg";
import gateImage from "@/assets/gate-automation.jpg";
import rpsImage from "@/assets/rps-smk4.jpg";

const items = ref([
  { image: gateImage },
  { image: rpsImage },
  { image: pj1Images },
  { image: earthTesterImage },
  { image: boxpanelImage },
]);

onMounted(() => {
  nextTick(() => {
    const grid = document.querySelector(".grid");
    const msnry = new Masonry(grid, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      percentPosition: true,
    });

    // Pastikan Masonry berjalan setelah semua gambar dimuat
    imagesLoaded(grid, () => {
      msnry.layout();
    });
  });
});
</script>

<style>
.project-section {
  min-height: 100vh;
}

/* Pastikan container utama ada padding supaya tidak terlalu mepet */
.project {
  /* max-width: 1200px; */
  margin: 0 auto;
  /* padding: 100px; */
}

/* Grid Masonry */
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Membuat item tetap di tengah */
  align-items: center;
  width: 100%;
  margin-left: 50px;
}

/* Ukuran default untuk desktop */
.grid-sizer,
.grid-item {
  width: 30%;
  padding: 10px;
}

.grid-item img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* RESPONSIVE */

@media (max-width: 768px) {
  .grid {
    margin-left: 0px;
  }
  .grid-sizer,
  .grid-item {
    width: 100%; /* 1 kolom di mobile */
  }
}

.grid-item img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out; /* Efek smooth */
}

.image-container img {
  width: 100%;
  display: block;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  filter: brightness(0.5); /* Efek dark */
}

/* Efek zoom saat hover */
.grid-item img:hover {
  transform: scale(1.1); /* Perbesar gambar 10% */
  filter: none;
}
</style>
