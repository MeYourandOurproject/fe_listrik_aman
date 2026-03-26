<template>
  <div>
    <ArtikelNavbar class="navbar" />
    <div class="layout">
      <router-view />
    </div>
    <!-- FLOATING WHATSAPP -->
    <div class="d-flex flex-wrap d-none d-lg-block">
      <div class="wa-float">
        <a href="https://wa.me/6287708972304" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-whatsapp"></i>
        </a>
        <a href="https://www.instagram.com/rulyabdulrasyid/" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-instagram"></i>
        </a>
        <a href="https://www.tiktok.com/@rulyabdulrasyid" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-tiktok"></i>
        </a>
        <a href="https://www.youtube.com/@rulyabdulrasyid" target="_blank" rel="noopener noreferrer">
          <i class="bi bi-youtube"></i>
        </a>
      </div>
    </div>
    <ArtikelFooter class="footer" />
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

<style>
.layout {
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)),
    url("../../../assets/pilihan-bg.webp");
  background-size: cover;
  background-position: top;
  position: relative;
  color: white;
}

.navbar {
  z-index: 11;
}

.footer {
  z-index: 11;
}

/* Floating WA (tidak diubah) */
.wa-float {
  position: fixed;
  right: 20px;
  bottom: 35px;
  display: flex;
  /* flex-direction: column;   bikin urut ke atas */
  gap: 12px; /* jarak antar ikon */
  z-index: 10;
}

/* Style masing-masing tombol */
.wa-float a {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  border-radius: 50%;

  color: white;
  font-size: 22px;
  text-decoration: none;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

/* Warna tiap platform */
.wa-float a:nth-child(1) {
  background: #25d366;
} /* WhatsApp */
.wa-float a:nth-child(2) {
  background: #e4405f;
} /* Instagram */
.wa-float a:nth-child(3) {
  background: #000000;
} /* TikTok */
.wa-float a:nth-child(4) {
  background: #ff0000;
} /* YouTube */

.wa-float a:hover {
  transform: translatey(-10px);
}
</style>
