<template>
  <div class="container-fluid tutorial-section py-5">
    <div
      class="container d-flex align-items-center justify-content-center text-center mb-5"
    >
      <h1 class="estimasi-title fw-bold text-white" id="tutorial">
        Tips, Trik dan Tutorial
      </h1>
    </div>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
        <!-- Looping untuk data tutorial -->
        <div
          class="col d-flex flex-column justify-content-center text-center"
          v-for="(tutorial, index) in tutorials"
          :key="index"
        >
          <img
            :src="tutorial.image"
            class="card-img-top rounded"
            style="height: 200px"
          />
          <div class="card-body">
            <a :href="tutorial.link" class="text-decoration-none hover-link">
              <p class="title-tutorial mt-2 fw-bold">{{ tutorial.title }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Kolom Kanan: Lihat Lebih Banyak -->
    <router-link to="/artikel" class="text-decoration-none text-reset">
      <div class="d-flex justify-content-center align-items-center mt-4">
        <button
          type="button"
          class="btn btn-outline-light btn-lg text-decoration-none"
        >
          Lebih Banyak Tips, Trik dan Tutorial
          <i class="bi bi-arrow-right-circle-fill ms-2"></i>
        </button></div
    ></router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Data tutorial (dinamis)
const tutorials = ref([
  {
    title: "Getting Started with ESP-NOW (ESP32 with Arduino IDE)",
    image: new URL("@/assets/hero-img.jpg", import.meta.url).href,
    link: "#",
  },
  {
    title: "How to Use MQTT for IoT Communication",
    image: new URL("@/assets/mqtt.jpg", import.meta.url).href,
    link: "#",
  },
  {
    title: "Building a Smart Home with ESP8266 & Node-RED",
    image: new URL("@/assets/smart-home.png", import.meta.url).href,
    link: "#",
  },
]);
</script>

<style>
.tutorial-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
    url("../../assets/hero-img.jpg");
  background-size: cover;
  background-position: bottom;
}

/* Animasi hover */
.hover-link {
  transition: transform 0.3s ease, color 0.3s ease;
  color: white;
}

.hover-link:hover {
  transform: scale(1.05);
  color: #f0db4f;
}
</style>
