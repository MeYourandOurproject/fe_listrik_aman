<template>
  <div class="container-fluid bio-page">
    <div
      class="container d-flex align-items-center justify-content-center text-center my-5"
    >
      <div class="row row-cols-1 g-5">
        <div class="col">
          <img
            src="../../../assets/logobrand.png"
            alt=""
            class="my-3 bg-white p-3 rounded-2"
            style="max-width: 120px"
          />
          <div class="display-1 fs-1 fw-bold brand text-uppercase text-white">
            Tukang Listrik <br />
            <span class="text-primary">BANDUNG</span>
          </div>
          <div class="fs-5 sub-brand mt-2 text-white">
            Perbaikan, Pemasangan Baru, Peremajaan, Penambahan
          </div>
        </div>
        <div class="d-grid gap-3 mt-4" style="max-width: 500px; margin: 0 auto">
          <a
            href="https://fe-listrik-aman.vercel.app/"
            class="btn btn-warning fs-5"
          >
            <i class="bi bi-globe me-3"></i>Halaman Website
          </a>

          <a href="https://wa.me/6285924333088" class="btn btn-success fs-5"
            ><i class="bi bi-whatsapp me-3"></i>Konsultasi Admin
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61574942556223&locale=id_ID"
            class="btn btn-primary fs-5"
            ><i class="bi bi-facebook me-3"></i>Facebook
          </a>

          <a
            href="https://www.instagram.com/listrikamanidn?igsh=MWFlNXZmZGNvMGFyOQ=="
            class="btn btn-danger fs-5"
            ><i class="bi bi-instagram me-3"></i>Instagram
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bio-page {
  min-height: 100vh;
  display: flex;
  background-color: #000000;
}

.brand {
  letter-spacing: 2px;
}

.sub-brand {
  font-style: italic;
}
</style>
