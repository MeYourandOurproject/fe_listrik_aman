<template>
  <footer class="footer-wrapper">
    <!-- TOP CONTENT -->
    <div class="container-xxl py-5 px-4">
      <div class="row g-5 align-items-start text-start">
        <!-- LOGO -->
        <div class="col-lg-3 text-start align-items-start">
          <img
            src="../../assets/guru_ngulik_logo.png"
            class="footer-logo mt-0"
          />
        </div>

        <!-- ALAMAT -->
        <div class="col-lg-3">
          <h6 class="footer-title">ALAMAT</h6>
          <p class="footer-text">
            Cisaranten Endah, Kecamatan Arcamanik, Kota Bandung, Provinsi Jawa
            Barat
          </p>
        </div>

        <!-- KONTAK -->
        <div class="col-lg-2">
          <h6 class="footer-title">KONTAK DAN SOSIAL MEDIA</h6>
          <p class="footer-text mb-2">
            <i class="bi bi-telephone me-2"></i> 0877-0897-2304
          </p>
          <p class="footer-text">
            <i class="bi bi-whatsapp me-2"></i> 0877-0897-2304
          </p>

          <div class="footer-social mt-3">
            <a href="https://www.instagram.com/rulyabdulrasyid/">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://www.tiktok.com/@rulyabdulrasyid">
              <i class="bi bi-tiktok"></i>
            </a>
            <a href="https://www.youtube.com/@rulyabdulrasyid">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        <!-- DESKRIPSI -->
        <div class="col-lg-4">
          <h6 class="footer-title">GURU NGULIK</h6>
          <p class="footer-text">
            Gurungulik adalah platform edukasi yang menyajikan artikel,
            tutorial, dan pembahasan seputar teknologi, kelistrikan, IoT dan Web
            Development. Kami hadir untuk membantu pelajar, guru, dan praktisi
            memahami konsep teknis dengan cara yang sederhana, aplikatif, dan
            mudah dipahami.
          </p>
        </div>
      </div>

      <hr class="footer-divider" />

      <div class="row align-items-center pt-3">
        <div class="col-md-6 text-center text-md-start footer-nav col-none">
          <router-link to="/">Home</router-link>
          <router-link to="/artikel">Artikel</router-link>
          <router-link to="/project">Project</router-link>
          <router-link to="/e-book">e-Book</router-link>
          <router-link to="/about">About</router-link>
        </div>

        <div class="col-md-6 text-center text-md-end footer-copy">
          © 2026 GuruNgulik.com. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.footer-wrapper {
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)),
    url("../../assets/hero-img.webp");
  color: white;
  overflow: hidden;
  z-index: 1;
  border-top: 2px solid rgba(255, 193, 7, 0.4);
  box-shadow: #ffc107;
}

/* decorative glow */
.footer-wrapper::before {
  content: "";
  position: absolute;
  left: -150px;
  top: -120px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(255, 193, 7, 0.15), transparent 70%);
  border-radius: 50%;
  z-index: 0;
  pointer-events: none;
}

.footer-wrapper > * {
  position: relative;
  z-index: 2;
}

.footer-logo {
  height: 100px;
}

/* TITLES */
.footer-title {
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: 1px;
  color: #ffc107;
  text-shadow: 0 0 12px rgba(255, 193, 7, 0.5);
}

/* TEXT */
.footer-text {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  font-size: 14px;
  text-align: justify;
}

/* DIVIDER */
.footer-divider {
  border-color: rgba(255, 193, 7, 0.4);
}

/* SOCIAL */
.footer-social a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 193, 7, 0.7);
  border-radius: 30%;
  color: #ffc107;
  margin-right: 10px;
  transition: 0.3s;
}

.footer-social a:hover {
  background: #ffc107;
  color: #000000;
  transform: translateY(-3px);
}

/* NAV */
.footer-nav a {
  color: rgba(255, 255, 255, 0.9);
  margin-right: 20px;
  text-decoration: none;
  font-weight: 500;
  position: relative;
}

.footer-nav a:hover {
  color: #ffc107;
}

.footer-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: #ffc107;
  transition: 0.3s;
}

.footer-nav a:hover::after {
  width: 100%;
}

/* COPYRIGHT */
.footer-copy {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .footer-nav {
    margin-bottom: 10px;
  }
}
</style>
