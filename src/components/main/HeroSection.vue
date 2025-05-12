<template>
  <div
    class="container-fluid hero-section align-items-center justify-content-center text-center"
  >
    <div class="container">
      <!-- Tagline Utama -->
      <div class="tagline display-3">JASA INSTALASI LISTRIK PROFESIONAL</div>
      <div class="lead text-white shadow-text mt-0">
        Nyala Aman, Hidup Nyaman
      </div>
      <!-- Efek Ketik -->
      <div class="typing-effect text-white"></div>
      <div class="mobile mt-4">
        <a href="https://wa.me/6285924333088" class="text-decoration-none me-2">
          <button class="btn btn-lg btn-success">
            <i class="bi bi-whatsapp me-2"></i>Tanya Admin
            <!-- <div class="popup-wa">Tanya Admin di WhatsApp!</div> -->
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Teks dengan tag <span> untuk kata "GRATIS" yang lebih besar dan miring
  const text = `<span class="highlight">GRATIS</span> Konsultasi dan Pengecekan <span class="highlight">se-Bandung Raya</span>`;
  const typingElement = document.querySelector(".typing-effect");
  let index = 0;

  // Fungsi untuk efek ketik
  const type = () => {
    if (index < text.length) {
      // Update innerHTML secara langsung untuk render HTML yang benar
      typingElement.innerHTML = text.substring(0, index + 1);
      index++;
      setTimeout(type, 20); // Kecepatan ketik (20ms per karakter)
    } else {
      // Jika sudah selesai ngetik, tunggu sebentar lalu reset
      setTimeout(() => {
        typingElement.innerHTML = ""; // Hilangkan teks
        index = 0; // Reset index ke 0
        setTimeout(type, 500); // Tunggu 0.5 detik sebelum mulai ketik lagi
      }, 2000); // Tunggu 2 detik sebelum mulai hapus
    }
  };

  type(); // Mulai efek ketik pertama kali
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;700&display=swap");

/* Gaya untuk Hero Section */
.hero-section {
  min-height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),
    url("../../assets/hero-img.jpg");
  display: flex;
  background-size: cover;
  padding-top: 50px;
}

/* Gaya Tagline */
.tagline {
  font-size: 60px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 200; /* Bikin tipis */
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 15px;
  border-radius: 20px;
  padding: 30px;
}

/* Gaya Sub-Tagline */
.lead {
  letter-spacing: 10px;
  font-size: 20px;
}

/* Efek Ketik (Typing Effect) */
.typing-effect {
  font-size: 25px;
  font-family: "Plus Jakarta Sans", sans-serif;
  font-weight: 300;
  letter-spacing: 5px;
  min-height: 50px; /* Kunci tinggi agar tidak berubah */
  /* border-right: 2px solid #fff; Kursor ketik */
  animation: blink 0.7s infinite;
  margin-top: 10px;
  display: inline-block;
}

/* Gaya untuk kata "GRATIS" yang lebih besar dan miring */
.highlight {
  font-size: 36px; /* Lebih besar dari teks lain */
  /* font-style: italic; Miring */
  font-weight: 500; /* Sedikit lebih tebal */
  color: #f49655; /* Warna kuning untuk menonjolkan */
}

.mobile {
  display: none;
}

/* Animasi Kedip Kursor */
@keyframes blink {
  0%,
  100% {
    border-color: transparent;
  }
  50% {
    border-color: #fff;
  }
}

/* CSS khusus untuk mode mobile */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
  }

  .tagline {
    font-family: "Plus Jakarta Sans", sans-serif;
    font-weight: 200; /* Bikin tipis */
    text-align: center;
    color: rgba(255, 255, 255, 0.9);
    /* letter-spacing: 15px; */
    border-radius: 20px;
    padding: 20px !important;
    font-size: 45px !important; /* Ukuran lebih kecil */
    letter-spacing: 0px !important; /* Hapus jarak huruf */
  }

  .typing-effect {
    font-size: 18px;
    font-family: "Plus Jakarta Sans", sans-serif;
    /* font-weight: 300; */
    /* letter-spacing: 5px; */
    /* min-height: 50px; Kunci tinggi agar tidak berubah */
    /* border-right: 2px solid #fff; Kursor ketik */
    animation: blink 0.7s infinite;
    margin-top: 10px;
    display: inline-block;
  }

  /* Gaya Sub-Tagline */
  .lead {
    display: none;
  }

  .highlight {
    font-size: 20px; /* Lebih besar dari teks lain */
    /* font-style: italic; Miring */
    font-weight: 500; /* Sedikit lebih tebal */
    color: #f49655; /* Warna kuning untuk menonjolkan */
  }

  .mobile {
    display: block;
  }
}
</style>
