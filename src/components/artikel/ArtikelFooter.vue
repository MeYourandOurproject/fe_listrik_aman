<template>
  <footer class="clean-footer">
    <div class="footer-container">

      <div class="row gy-4">

        <!-- BRAND -->
        <div class="col-lg-4 col-md-6">
          <div class="brand-wrapper">
            <img
              src="../../assets/logobrand.png"
              alt="Listrik Aman"
              class="footer-logo"
            />
            <!-- <h5 class="brand-name">Listrik Aman</h5> -->
          </div>

          <p class="brand-desc">
            Platform edukasi kelistrikan dan IoT untuk Smart Home,
            menyediakan artikel pembelajaran, ebook, dan toko online
            komponen listrik & elektronik.
          </p>
        </div>

        <!-- LAYANAN -->
        <div class="col-lg-3 col-md-6">
          <h6 class="footer-title">Layanan</h6>
          <ul class="footer-links">
            <li><router-link to="/artikel">Edukasi</router-link></li>
            <li><router-link to="/ebook">Ebook</router-link></li>
            <li><router-link to="/toko">Toko Online</router-link></li>
          </ul>
        </div>

        <!-- NAVIGASI -->
        <div class="col-lg-3 col-md-6">
          <h6 class="footer-title">Navigasi</h6>
          <ul class="footer-links">
            <li><router-link to="/tentang">Tentang</router-link></li>
            <li><router-link to="/kontak">Kontak</router-link></li>
            <li><router-link to="/kebijakan">Kebijakan Privasi</router-link></li>
          </ul>
        </div>

        <!-- SOCIAL -->
        <div class="col-lg-2 col-md-6">
          <h6 class="footer-title">Terhubung</h6>
          <div class="social-icons">
            <a href="https://wa.me/6285924333088" target="_blank">
              <i class="bi bi-whatsapp"></i>
            </a>
            <a href="https://instagram.com/rulyabdulrasyid" target="_blank">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="https://youtube.com/@rulyabdulrasyid2693" target="_blank">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© 2025 Listrik Aman. All rights reserved.</span>
      </div>

    </div>
  </footer>
</template>

<style>
.clean-footer {
  background: #ffffff;
  padding: 60px 0 30px;
  border-top: 1px solid #eaeaea;
}

.footer-container {
  max-width: 1320px;
  margin: auto;
  padding: 0 20px;
}

.brand-name {
  font-weight: 600;
  margin-bottom: 12px;
  color: #111;
}

.brand-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.footer-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #111;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  font-size: 14px;
  color: #555;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-links a:hover {
  color: #000;
}

.social-icons a {
  font-size: 18px;
  margin-right: 12px;
  color: #555;
  transition: all 0.2s ease;
}

.social-icons a:hover {
  color: #000;
}

.footer-bottom {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 13px;
  color: #888;
  text-align: center;
}

.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.footer-logo {
  height: 45px;
  width: auto;
}

.brand-name {
  font-weight: 600;
  margin: 0;
  color: #111;
}

@media (max-width: 768px) {
  .clean-footer {
    padding: 40px 0 20px;
  }
}
</style>