<template>
  <div class="container-fluid footer-layout">
    <div
      class="container d-flex align-items-center justify-content-start text-start"
    >
      <a class="footer-brand" href="#">
        <img
          src="../assets/logobrand.png"
          alt=""
          class="footer-logo-brand mt-5 mb-3"
        />
      </a>
    </div>
    <div class="container">
      <div class="row d-flex align-items-end justify-content-between">
        <div class="col-8 text-start mb-0">
          <div class="row display-6 ms-0 text-white mb-3">
            Layanan Jasa Instalasi Listrik
          </div>
          <div class="row text-white display-6 fs-6">
            <div class="col-auto">
              <ul class="list-unstyled">
                <li><i class="bi bi-tools me-2"></i>Perbaikan</li>
                <li><i class="bi bi-stars me-2"></i>Peremajaan</li>
              </ul>
            </div>
            <div class="col-auto">
              <ul class="list-unstyled">
                <li><i class="bi bi-plugin me-2"></i>Pemasangan Baru</li>
                <li><i class="bi bi-arrows-move me-2"></i>Penambahan</li>
              </ul>
            </div>
            <div class="col-auto">
              <ul class="list-unstyled">
                <li><i class="bi bi-router-fill me-2"></i>Perangkat IoT</li>
                <li>
                  <i class="bi bi-shop me-2"></i>Toko Listrik dan Komponen
                  Elektronik
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4 text-end display-5 text-white align-items-end mb-2 \">
          Contact <br />and Follow us at.
        </div>
      </div>
      <div class="row border-dot"></div>
      <div
        class="row display-6 fs-6 mt-3 text-white justify-content-between pb-5"
      >
        <div class="col text-start">2025 - All Right Reserved @ Copyright</div>
        <div class="col text-end">
          <div class="row fs-5 d-flex justify-content-end">
            <div class="col-auto">
              <a
                href="https://wa.me/6285924333088"
                class="text-decoration-none icon-hover"
                ><i class="bi bi-whatsapp text-white fs-3"></i
              ></a>
            </div>
            <div class="col-auto">
              <a
                href="https://www.instagram.com/rulyabdulrasyid?utm_source=qr&igsh=MTR4YW5veThzd3B0cw=="
                class="text-decoration-none icon-hover"
                ><i class="bi bi-instagram text-white fs-3"></i
              ></a>
            </div>
            <div class="col-auto">
              <a
                href="https://youtube.com/@rulyabdulrasyid2693?si=Fo-g9cUNUsTeV1gz"
                class="text-decoration-none icon-hover"
                ><i class="bi bi-youtube text-white fs-3"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.footer-layout {
  /* background-color: rgb(73, 73, 73); */
  min-height: 50vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url("../assets/hero-img.jpg");
  background-size: cover;
}

.footer-buttom {
  background-color: black;
}

.footer-brand img {
  color: #fff !important; /* Teks Putih */
  filter: brightness(0) invert(1); /* Logo Putih */
}

.footer-logo-brand {
  height: 70px;
  transition: filter 0.5s ease-in-out;
}

.border-dot {
  border-top: 1px solid #ffffff; /* Warna dan ketebalan bisa disesuaikan */
}

.icon-hover {
  display: inline-block;
  transition: transform 0.3s ease, rotate 0.2s ease;
}

.icon-hover:hover {
  transform: scale(1.2) rotate(-5deg); /* Zoom dan goyang */
}
</style>
