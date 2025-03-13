<template>
  <div>
    <!-- Navbar dengan binding class dinamis -->
    <div
      :class="[
        'container-fluid',
        'fixed-top',
        navbarScrolled ? 'bg-white' : 'bg-transparent',
      ]"
    >
      <!-- <div class="container"> -->
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          .container
          <!-- Logo Brand -->
          <a class="navbar-brand" href="#">
            <img src="../assets/logobrand.png" alt="" class="logo-brand" />
          </a>

          <!-- Tombol Hamburger -->
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Menu -->
          <div class="collapse navbar-collapse justify-content-center">
            <ul class="navbar-nav text-center gap-4 fw-bold">
              <li class="nav-item">
                <a class="nav-link" href="#">PRICE LIST</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">PROJECT</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">GALERY</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">ABOUT US</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const navbarScrolled = ref(false);

// Fungsi untuk mendeteksi scroll
const handleScroll = () => {
  navbarScrolled.value = window.scrollY > 50;
};

// Pasang event listener ketika komponen dimuat
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Bersihkan event listener ketika komponen dilepas
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.logo-brand {
  height: 50px;
}
.bg-transparent {
  background-color: transparent !important;
  transition: background-color 1s ease-in-out;
}
.bg-white {
  transition: background-color 0.3s ease-in-out;
}
</style>
