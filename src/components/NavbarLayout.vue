<template>
  <div
    :class="[
      'container-fluid shadow-sm',
      'fixed-top',
      navbarScrolled ? 'bg-white' : 'bg-transparent',
    ]"
  >
    <div :class="['container', navbarScrolled ? 'my-3' : 'my-5']">
      <div class="row align-items-center">
        <!-- Logo Brand -->
        <div class="col-3 text-center">
          <a class="navbar-brand" href="#">
            <img src="../assets/logobrand.png" alt="" class="logo-brand" />
          </a>
        </div>

        <!-- Tombol Hamburger untuk Mobile -->
        <div class="col-9 d-lg-none text-end">
          <button
            :class="['navbar-toggler', navbarScrolled ? '' : 'text-white']"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="bi bi-list fs-1 humberger-icon"></i>
          </button>
        </div>

        <!-- Menu untuk Desktop (Horizontal) -->
        <div class="col-9 d-none d-lg-block">
          <ul
            class="nav text-center justify-content-center align-items-center gap-1 fw-bold d-flex"
          >
            <li class="nav-item">
              <a class="nav-link" href="#layanan">Layanan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#estimasi-biaya">Estimasi Biaya</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#project">Project</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#tutorial">Tips & Trik</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#tentang-kami">Tentang Kami</a>
            </li>
            <li class="nav-item">
              <a
                href="https://wa.me/6285924333088"
                class="text-decoration-none me-2 ms-5"
              >
                <button class="btn btn-lg btn-success">
                  <i class="bi bi-whatsapp me-2"></i>Tanya Admin
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Menu Hamburger untuk Mobile (Vertical) -->
      <div class="collapse d-lg-none" id="navbarNav">
        <ul
          :class="[
            'navbar-nav',
            'text-center',
            'gap-1',
            'fw-bold',
            navbarScrolled ? 'bg-white' : 'bg-dark',
          ]"
        >
          <li class="nav-item">
            <a class="nav-link" href="#layanan">Layanan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#estimasi-biaya">Estimasi Biaya</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#project">Project</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#tutorial">Tips & Trik</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#tentang-kami">Tentang Kami</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Tombol Back to Top -->
  <i
    v-if="showBackToTop"
    @click="scrollToTop"
    class="bi bi-chevron-compact-up back-to-top"
  ></i>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const navbarScrolled = ref(false);
const showBackToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  navbarScrolled.value = window.scrollY > 50;
  showBackToTop.value = window.scrollY > 500;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
html {
  scroll-behavior: smooth;
}
.container {
  transition: margin 0.5s ease-in-out;
}

.logo-brand {
  height: 50px;
  transition: filter 0.5s ease-in-out;
}

/* Navbar Transparan */
.bg-transparent .nav-link {
  color: white !important; /* Pastikan teks putih */
}

.bg-transparent .navbar-brand img {
  filter: brightness(0) invert(1); /* Logo jadi putih */
}

.bg-transparent .navbar-toggler i {
  color: white !important; /* Ikon hamburger putih */
}

/* Navbar Saat di-scroll */
.bg-white .nav-link {
  color: black !important; /* Teks jadi hitam */
}

.bg-white .navbar-brand img {
  filter: none; /* Logo kembali normal */
}

.bg-white .navbar-toggler i {
  color: black !important; /* Ikon hamburger hitam */
}

/* Efek Hover */
.nav-link:hover {
  color: #f49655 !important; /* Warna oranye saat hover */
}

/* Transisi Halus */
.bg-transparent,
.bg-white,
.nav-link,
.logo-brand {
  transition: all 0.5s ease-in-out;
}

/* Tombol Back to Top */
.back-to-top {
  position: fixed;
  bottom: 10px;
  right: 50%;
  z-index: 1000;
  font-size: 40px;
  color: #f49655;
  cursor: pointer;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.back-to-top:hover {
  color: #f49655;
  transform: scale(2);
}

.humberger-icon {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.humberger-icon:hover {
  transform: scale(1.2);
}
</style>
