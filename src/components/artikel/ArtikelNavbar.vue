<template>
  <div
    :class="[
      'container-fluid ',
      'fixed-top',
      navbarScrolled ? 'bg-white shadow-sm' : 'bg-light',
    ]"
  >
    <div :class="['container', navbarScrolled ? 'my-2' : 'my-3']">
      <div class="row align-items-center">
        <!-- Logo Brand -->
        <div class="col-2 text-center">
          <!-- <div class="text-white fs-1">Jurnal of</div> -->
          <a class="navbar-brand" href="/artikel">
            <img src="../../assets/logobrand.png" alt="" class="logo-brand" />
          </a>
        </div>

        <!-- Tombol Hamburger untuk Mobile -->
        <div class="col-10 d-lg-none text-end">
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
        <div class="col-5 d-none d-lg-block">
          <ul
            class="nav text-center justify-content-center align-items-center gap-1 fw-bold d-flex"
          >
            <li class="nav-item">
              <a class="nav-link" href="#layanan">Free eBooks</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#estimasi-biaya">About</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#project">Contact</a>
            </li>
          </ul>
        </div>

        <div class="col-5 d-none d-lg-block">
          <ul
            class="nav text-center justify-content-center align-items-center gap-3 fw-bold d-flex"
          >
            <li class="nav-item">
              <div class="d-flex align-items-center">
                <a
                  href="https://www.youtube.com/@rulyabdulrasyid"
                  class="text-decoration-none me-2"
                >
                  <i class="bi bi-youtube text-dark fs-2"></i>
                </a>
                <small>Youtube</small>
              </div>
            </li>
            <li class="nav-item">
              <div class="d-flex align-items-center">
                <a
                  href="https://www.instagram.com/rulyabdulrasyid/"
                  class="text-decoration-none me-2"
                >
                  <i class="bi bi-instagram text-dark fs-3"></i>
                </a>
                <small>Instagram</small>
              </div>
            </li>
            <li class="nav-item">
              <div class="d-flex align-items-center">
                <a
                  href="https://www.facebook.com/profile.php?id=61574942556223"
                  class="text-decoration-none me-2"
                >
                  <i class="bi bi-facebook text-dark fs-3"></i>
                </a>
                <small>Facebook</small>
              </div>
            </li>
            <li class="nav-item">
              <div class="d-flex align-items-center">
                <a
                  href="https://www.tiktok.com/@rrulyabdulrasyid"
                  class="text-decoration-none me-2"
                >
                  <i class="bi bi-tiktok text-dark fs-3"></i>
                </a>
                <small>Tiktok</small>
              </div>
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
            navbarScrolled ? 'bg-white' : '',
          ]"
        >
          <li class="nav-item">
            <a class="nav-link" href="#layanan">Free eBooks</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#estimasi-biaya">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#project">Contact</a>
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
.bg-light .nav-link {
  color: black !important; /* Pastikan teks putih */
}

.bg-light .navbar-brand img {
  filter: brightness(100) invert(1); /* Logo jadi putih */
}

.bg-light .navbar-toggler i {
  color: black !important; /* Ikon hamburger putih */
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

.nav-link {
  transition: transform 0.2s ease, text-shadow 0.2s ease;
}

.nav-link:hover {
  transform: scale(1.1);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.nav-item{
  transition: transform 0.2s ease, text-shadow 0.2s ease;
}

.nav-item:hover {
  transform: scale(1.1);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Transisi Halus */
.bg-warning,
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
