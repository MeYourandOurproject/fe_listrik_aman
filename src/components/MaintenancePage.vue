<template>
  <section class="maintenance-page d-flex align-items-center justify-content-center text-center">
    <div class="content text-white px-3">
      <h1 class="fw-bold mb-3">🚧 <br><br>Website Dalam Pemeliharaan</h1>
      <!-- <p class="lead mb-4">
        Kami sedang melakukan peningkatan sistem untuk kenyamanan Anda.<br>
        Silakan kembali beberapa saat lagi.
      </p> -->

      <div class="loading-bar mx-auto mb-4"></div>

      <small>© {{ new Date().getFullYear() }} GuruNgulik.id</small>
    </div>
  </section>
</template>

<style scoped>
.maintenance-page {
  min-height: 100vh;
  background-image:
    linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.25)),
    url("../assets/img_hero_all.PNG");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  position: relative;
}

/* Glass effect content */
.content {
  background: rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
  padding: 40px 30px;
  border-radius: 20px;
  max-width: 520px;
}

/* Loading animation */
.loading-bar {
  width: 180px;
  height: 6px;
  border-radius: 10px;
  background: rgba(255,255,255,0.25);
  overflow: hidden;
  position: relative;
}

.loading-bar::before {
  content: "";
  position: absolute;
  left: -40%;
  width: 40%;
  height: 100%;
  background: white;
  animation: loading 1.4s infinite ease-in-out;
  border-radius: 10px;
}

@keyframes loading {
  0% { left: -40%; }
  100% { left: 100%; }
}

/* Responsive text */
h1 {
  font-size: 2rem;
}

@media (min-width: 768px) {
  h1 {
    font-size: 2.6rem;
  }
}
</style>