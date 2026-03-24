<template>
  <div
    class="container-fluid home-heroes d-flex align-items-center justify-content-center text-center py-5 py-md-4"
  >
    <!-- HERO -->
    <div class="container-xxl">
      <div
        class="row d-flex align-items-center justify-content-center justify-content-md-start g-5 pt-5"
      >
        <!-- TEXT -->
        <div class="col-12 col-md-8">
          <div class="home-title fw-bold text-white shadow-text text-center text-md-start">
            Tempatnya Ngulik <span class="text-warning">Listrik</span>,
            <span class="text-warning">IoT</span>, &
            <span class="text-warning">Web Development</span>
          </div>

          <p class="hero-subtitle fs-4 text-white shadow-text mt-3">
            Berbagi materi, tutorial, dan pengalaman praktik dari seorang guru
            yang hobi eksplorasi teknologi.
          </p>

          <div class="hero-buttons d-flex gap-3 mt-4 flex-nowrap">
            <router-link to="/artikel"
              ><button class="btn-hero btn-primary-hero">
                <i class="bi bi-journal-text me-2"></i>
                Jelajahi Artikel
              </button></router-link
            >

            <router-link to="/project"
              ><button class="btn-hero btn-secondary-hero">
                <i class="bi bi-lightning-charge me-2"></i>
                Lihat Project
              </button></router-link
            >
          </div>
        </div>

        <!-- IMAGE -->
        <div class="col-12 col-md-4 order-first order-md-last text-center">
          <img
            src="../../../assets/guru_ngulik.png"
            alt=""
            class="img-fluid floating-img"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- TOPIK PILIHAN -->
  <div class="container-fluid py-5 topic-section">
    <div class="container-xxl">
      <h2 class="topic-title text-white fw-bold text-center">
        Topik <span class="text-warning">Pilihan</span>
      </h2>

      <div
        class="row g-4 justify-content-center p-4 rounded-4 my-5"
        style="
          background: rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(6px);
          /* border: 1px solid rgba(255, 255, 255, 0.15); */
        "
      >
        <!-- CARD 2 -->
        <div class="col col-md-4">
          <div class="topic-card">
            <i class="bi bi-wifi text-warning"></i>
            <p>Internet of Things</p>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="col col-md-4">
          <div class="topic-card">
            <i class="bi bi-browser-safari text-warning"></i>
            <p>Web Development</p>
          </div>
        </div>

        <div class="col col-md-4">
          <div class="topic-card">
            <i class="bi bi-lightning-charge-fill text-warning"></i>
            <p>Electrical</p>
          </div>
        </div>
      </div>

      <!-- BUTTON -->
      <div class="text-center my-5">
        <button class="btn-topic text-warning">
          Lihat Semua Topik
          <i class="bi bi-chevron-right ms-2"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="container-fluid py-5 artikel-populer">
    <div class="container-xxl my-5">
      <h2 class="topic-title text-white fw-bold text-center">
        Project <span class="text-warning">Populer</span>
      </h2>
      <div class="row g-4 mt-4">
        <!-- CARD 1 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="article-card">
            <div class="article-img">
              <img src="https://picsum.photos/600/400?1" alt="" />
              <span class="article-badge">Internet of Things</span>
            </div>
            <div class="article-content">
              <h5>Mengenal ESP32 untuk Smart Home System</h5>
              <p>
                Belajar dasar penggunaan ESP32 untuk otomasi rumah berbasis IoT
                dengan studi kasus nyata.
              </p>
              <div class="article-meta">
                <span><i class="bi bi-eye"></i> 1.2k</span>
                <span><i class="bi bi-chat-dots"></i> 86</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="article-card">
            <div class="article-img">
              <img src="https://picsum.photos/600/400?2" alt="" />
              <span class="article-badge">Electrical</span>
            </div>
            <div class="article-content">
              <h5>Cara Instalasi Panel Listrik Rumah Aman</h5>
              <p>
                Panduan lengkap instalasi panel listrik rumah sesuai standar
                PUIL dan keamanan.
              </p>
              <div class="article-meta">
                <span><i class="bi bi-eye"></i> 980</span>
                <span><i class="bi bi-chat-dots"></i> 54</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="article-card">
            <div class="article-img">
              <img src="https://picsum.photos/600/400?3" alt="" />
              <span class="article-badge">Web Development</span>
            </div>
            <div class="article-content">
              <h5>Membuat Dashboard Monitoring IoT dengan Vue</h5>
              <p>
                Tutorial membuat dashboard monitoring realtime berbasis Vue dan
                integrasi API perangkat IoT.
              </p>
              <div class="article-meta">
                <span><i class="bi bi-eye"></i> 2.4k</span>
                <span><i class="bi bi-chat-dots"></i> 132</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container-fluid py-5 artikel-populer"> -->
    <div class="container-xxl py-5 my-5">
      <h2 class="topic-title text-white fw-bold text-center">
        Artikel <span class="text-warning">Populer</span>
      </h2>
      <div class="row g-4 mt-4">
        <!-- CARD 1 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="article-card">
            <div class="article-img">
              <img src="https://picsum.photos/600/400?1" alt="" />
              <span class="article-badge">Internet of Things</span>
            </div>
            <div class="article-content">
              <h5>Mengenal ESP32 untuk Smart Home System</h5>
              <p>
                Belajar dasar penggunaan ESP32 untuk otomasi rumah berbasis IoT
                dengan studi kasus nyata.
              </p>
              <div class="article-meta">
                <span><i class="bi bi-eye"></i> 1.2k</span>
                <span><i class="bi bi-chat-dots"></i> 86</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 2 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="article-card">
            <div class="article-img">
              <img src="https://picsum.photos/600/400?2" alt="" />
              <span class="article-badge">Electrical</span>
            </div>
            <div class="article-content">
              <h5>Cara Instalasi Panel Listrik Rumah Aman</h5>
              <p>
                Panduan lengkap instalasi panel listrik rumah sesuai standar
                PUIL dan keamanan.
              </p>
              <div class="article-meta">
                <span><i class="bi bi-eye"></i> 980</span>
                <span><i class="bi bi-chat-dots"></i> 54</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="col-12 col-md-6 col-lg-4">
          <div class="article-card">
            <div class="article-img">
              <img src="https://picsum.photos/600/400?3" alt="" />
              <span class="article-badge">Web Development</span>
            </div>
            <div class="article-content">
              <h5>Membuat Dashboard Monitoring IoT dengan Vue</h5>
              <p>
                Tutorial membuat dashboard monitoring realtime berbasis Vue dan
                integrasi API perangkat IoT.
              </p>
              <div class="article-meta">
                <span><i class="bi bi-eye"></i> 2.4k</span>
                <span><i class="bi bi-chat-dots"></i> 132</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Free eBook -->
    <div
      class="container-xxl py-5 my-5"
      style="
        background: rgba(0, 0, 0, 0.08);
        backdrop-filter: blur(6px);
        /* border: 1px solid rgba(255, 255, 255, 0.15); */
        border-radius: 18px;
      "
    >
      <div class="row g-4 align-items-center px-4">
        <div class="col-12 col-md-2 text-center">
          <img src="../../../assets/ebook.png" alt="" class="floating-img" style="height: 250px;">
        </div>
        <div class="col-12 col-md-10 text-center text-md-start">
          <h1 class="text-white fw-bold">
            Dapatkan eBook Gratis: <br /> <span class="text-warning">Panduan Lengkap IoT untuk Pemula</span>
          </h1>
          <p class="fs-6 text-white">
            Pelajari dasar-dasar Internet of Things dengan eBook gratis kami
            yang mudah dipahami, lengkap dengan contoh praktis dan studi kasus
            nyata.
          </p>
          <button class="btn-topic text-warning">
            Unduh eBook
            <i class="bi bi-download ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* =========================
   HERO SECTION
========================= */
.home-heroes {
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/hero-img.webp");
  background-size: cover;
  background-position: top;
  position: relative;
  z-index: 2;
}

.home-heroes .container-xxl {
  position: relative;
  z-index: 2;
}

/* Gradasi penyambung */
.home-heroes::after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 140px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, #000 85%);
  z-index: 1;
}

/* =========================
   TEXT
========================= */
.home-title {
  font-size: 4rem;
  line-height: 1.2;
  letter-spacing: 1px;
  text-align: start;
}

.hero-subtitle {
  text-align: start;
}

/* Efek bayangan teks */
.shadow-text {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
}

/* =========================
   FLOATING IMAGE
========================= */
.floating-img {
  animation: floating 3.5s ease-in-out infinite;
  max-width: 100%;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-18px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* =========================
   HERO BUTTON PREMIUM
========================= */
.hero-buttons {
  justify-content: start;
}

.btn-hero {
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 700;
  border: none;
  font-size: 1rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

/* Tombol Kuning (Primary CTA) */
.btn-primary-hero {
  background: linear-gradient(45deg, #ffb300, #ffcc00);
  color: #1a1a1a;
  box-shadow: 0 0 18px rgba(255, 193, 7, 0.35);
}

.btn-primary-hero:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 28px rgba(255, 193, 7, 0.7);
}

/* Tombol Gelap (Secondary CTA) */
.btn-secondary-hero {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.btn-secondary-hero:hover {
  background: rgba(255, 193, 7, 0.15);
  border: 1px solid rgba(255, 193, 7, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.35);
}

/* =========================
   MOBILE RESPONSIVE
========================= */
@media (max-width: 768px) {
  .home-heroes {
    min-height: auto;
    padding-top: 120px;
    padding-bottom: 80px;
    text-align: center;
  }

  .home-title {
    font-size: 2.2rem;
    line-height: 1.3;
    text-align: center;
  }

  .hero-subtitle {
    font-size: 1rem !important;
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
    gap: 14px;
  }

  .btn-hero {
    padding: 12px 20px;
    font-size: 0.9rem;
  }

  .floating-img {
    width: 70%;
    max-width: 260px;
    margin-top: 10px;
  }
}

/* =========================
   TOPIC SECTION
========================= */
.topic-section {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/hero-img.webp");
  background-size: cover;
  background-position: bottom;
}

.topic-section .container-xxl {
  position: relative;
  z-index: 2;
}

.topic-section::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%);
  z-index: 0;
}

/* Glow effect background */
.topic-section::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%);
  z-index: 0;
}

/* Title */
.topic-title {
  font-size: 2.6rem;
  text-align: left;
  z-index: 99;
}

/* =========================
   TOPIC CARD
========================= */
.topic-card {
  /* background: linear-gradient(145deg, #1b1b1b, #111); */
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/hero-img.webp");
  border-radius: 18px;
  padding: 28px 20px;
  text-align: center;
  color: white;
  /* border: 1px solid rgba(255, 193, 7, 0.15); */
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  box-shadow: 0 0 15px rgba(255, 193, 7, 0.25);
}

.topic-card i {
  font-size: 2.4rem;
  /* color: #ffc107; */
  margin-bottom: 14px;
  display: block;
}

.topic-card p {
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 1.5rem;
}

/* Hover Effect */
.topic-card:hover {
  transform: translateY(-10px);
  border: 1px solid rgba(255, 193, 7, 0.6);
  box-shadow: 0 0 25px rgba(255, 193, 7, 0.25);
}

/* =========================
   BUTTON
========================= */
.btn-topic {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/hero-img.webp");
  border: none;
  padding: 14px 30px;
  border-radius: 10px;
  font-weight: bold;
  letter-spacing: 0.5px;
  /* color: rgba(255, 193, 7, 0.7); */
  transition: all 0.3s ease;
  box-shadow: 0 0 18px rgba(255, 193, 7, 0.35);
}

.btn-topic:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 28px rgba(255, 193, 7, 0.7);
}

/* =========================
   MOBILE
========================= */
@media (max-width: 768px) {
  .topic-title {
    text-align: center;
    font-size: 2rem;
  }

  .topic-card {
    padding: 22px 14px;
  }

  .topic-card i {
    font-size: 2rem;
  }
}

.artikel-populer {
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/hero-img.webp");
  background-size: cover;
  background-position: top;
}

.artikel-populer .container-xxl {
  position: relative;
  z-index: 2;
}

.artikel-populer::after {
  content: "";
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  height: 250px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 0%, #000 100%);
  z-index: 0;
}

/* =========================
   ARTICLE CARD
========================= */
.article-card {
  background: linear-gradient(145deg, #1b1b1b, #111);
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 193, 7, 0.08);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 30px rgba(255, 193, 7, 0.25);
  border: 1px solid rgba(255, 193, 7, 0.5);
}

/* Image */
.article-img {
  position: relative;
  overflow: hidden;
  height: 220px;
}

.article-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.article-card:hover .article-img img {
  transform: scale(1.08);
}

/* Badge kategori */
.article-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: linear-gradient(45deg, #ffb300, #ffcc00);
  color: #1a1a1a;
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: bold;
}

/* Content */
.article-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.article-content h5 {
  color: white;
  font-weight: 700;
  margin-bottom: 10px;
}

.article-content p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  flex-grow: 1;
}

/* Meta info */
.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 15px;
}

.article-meta i {
  margin-right: 6px;
  color: #ffc107;
}

/* Responsive */
@media (max-width: 768px) {
  .article-img {
    height: 190px;
  }
}
</style>
