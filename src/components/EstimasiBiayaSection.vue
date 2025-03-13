<template>
  <div
    class="container-fluid align-items-center justify-content-center text-center estimasi-section"
  >
    <div class="container my-5">
      <div class="row mb-5">
        <h1 class="estimasi-title fw-bold" id="estimasi-biaya">
          Biaya Jasa Instalasi Listrik <br />
        </h1>
        <h5 class="fw-normal">
          Biaya jasa dapat disesuaikan dengan pilihan: <br />
          tanpa material
          <span class="fw-bold">(material disediakan oleh pelanggan)</span> atau
          termasuk material
          <span class="fw-bold">(material disediakan oleh kami)</span>
        </h5>
      </div>
      <div
        class="row mb-4 d-flex align-items-center justify-content-center switch-section"
      >
        <div class="col text-end">
          <span
            :class="!isMaterial ? 'text-active' : 'text-inactive'"
            class="fs-4"
          >
            Non Material
          </span>
        </div>

        <div class="col-1 d-flex justify-content-center">
          <div class="form-check form-switch custom-switch ps-5 ms-5">
            <input
              class="form-check-input fs-2 border"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              v-model="isMaterial"
            />
          </div>
        </div>

        <div class="col text-start">
          <span
            :class="isMaterial ? 'text-active' : 'text-inactive'"
            class="fs-4"
          >
            Material
          </span>
        </div>
      </div>

      <!-- Tabel Material -->
      <div v-if="isMaterial" class="mt-5 fade-in">
        <table class="table table-striped text-center table-sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Material</th>
              <th>Satuan</th>
              <th>Merek</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(kategori, kategoriIndex) in materials"
              :key="'material-kategori-' + kategoriIndex"
            >
              <!-- Baris Kosong Sebelum Kategori (Kecuali yang Paling Atas) -->
              <tr v-if="kategoriIndex !== 0">
                <td colspan="5" class="empty-row"></td>
              </tr>
              <!-- Kategori -->
              <tr class="fw-bold">
                <td colspan="5">
                  <span class="text-kategori">{{ kategori.kategori }}</span>
                </td>
              </tr>
              <tr
                v-for="(material, index) in kategori.data"
                :key="'material-' + kategoriIndex + '-' + index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ material.nama }}</td>
                <td>{{ material.satuan }}</td>
                <td>{{ material.merek }}</td>
                <td>{{ material.harga }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="container my-5">
          <div class="card">
            <div class="card-header fw-bold">Catatan Penting</div>
            <div class="card-body">
              <ul class="list-unstyled">
                <li
                  v-for="(note, index) in notesMaterial"
                  :key="'material-' + index"
                  class="mb-2"
                >
                  - {{ note }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabel Non Material -->
      <div v-else class="mt-5 fade-in">
        <table class="table table-striped text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Jasa</th>
              <th>Satuan</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="(kategori, kategoriIndex) in nonMaterials"
              :key="'nonmaterial-kategori-' + kategoriIndex"
            >
              <!-- Baris Kosong Sebelum Kategori (Kecuali yang Paling Atas) -->
              <tr v-if="kategoriIndex !== 0">
                <td colspan="4" class="empty-row"></td>
              </tr>
              <!-- Kategori -->
              <tr class="fw-bold">
                <td colspan="4">
                  <span class="text-kategori">{{ kategori.kategori }}</span>
                </td>
              </tr>
              <tr
                v-for="(jasa, index) in kategori.data"
                :key="'nonmaterial-' + kategoriIndex + '-' + index"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ jasa.nama }}</td>
                <td>{{ jasa.satuan }}</td>
                <td>{{ jasa.harga }}</td>
              </tr>
            </template>
          </tbody>
        </table>
        <div class="container my-5">
          <div class="card shadow-sm">
            <div class="card-header fw-bold">Catatan Penting</div>
            <div class="card-body">
              <ul class="list-unstyled">
                <li
                  v-for="(note, index) in notesNonMaterial"
                  :key="'non-material-' + index"
                  class="mb-2"
                >
                  - {{ note }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;700&display=swap");

.estimasi-section {
  min-height: 100vh;
}

.estimasi-title {
  font-size: 50px;
  font-family: "Plus Jakarta Sans", sans-serif;
  letter-spacing: 2px;
}

.custom-switch .form-check-input {
  width: 70px;
  height: 30px;
  background-color: #f49655;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.custom-switch .form-check-input:checked {
  background-color: #f49655;
}

.custom-switch .form-check-input:before {
  content: "";
  display: block;
  width: 28px;
  height: 28px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s;
}

.custom-switch .form-check-input:checked:before {
  transform: translateX(35px);
}

.switch-section {
  margin-top: 20px;
  gap: 5px;
}

.text-active,
.text-inactive {
  padding: 0 5px;
  font-weight: bold;
  transition: color 0.3s;
}

.text-active {
  color: #f49655;
}

.text-inactive {
  color: #999;
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.empty-row {
  height: 30px; /* Menambahkan jarak antar kategori */
  background-color: transparent;
}

.text-kategori {
  color: #f49655;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .custom-switch .form-check-input:checked:before {
    transform: translateX(20px);
  }
}
</style>

<script setup>
import { ref } from "vue";

const isMaterial = ref(false);

const materials = ref([
  {
    kategori: "Biaya Instalasi Listrik",
    data: [
      {
        nama: "Instalasi MCCB",
        satuan: "ttk",
        merek: "Supreme",
        harga: "Rp 273.000",
      },
      {
        nama: "Instalasi MCCB",
        satuan: "ttk",
        merek: "Eterna",
        harga: "Rp 236.000",
      },
      {
        nama: "Instalasi RCCB",
        satuan: "ttk",
        merek: "Supreme",
        harga: "Rp 236.000",
      },
      {
        nama: "Instalasi RCCB",
        satuan: "ttk",
        merek: "Eterna",
        harga: "Rp 200.200",
      },
      {
        nama: "Instalasi Panel MCB",
        satuan: "ttk",
        merek: "Supreme",
        harga: "Rp 182.000",
      },
      {
        nama: "Instalasi Panel MCB",
        satuan: "ttk",
        merek: "Eterna",
        harga: "Rp 145.600",
      },
      {
        nama: "Instalasi Kabel Toufour/ Kabel Induk",
        satuan: "m1",
        merek: "Supreme",
        harga: "Rp 163.800",
      },
      {
        nama: "Instalasi Kabel Toufour/ Kabel Induk",
        satuan: "m1",
        merek: "Eterna",
        harga: "Rp 127.400",
      },
      {
        nama: "Instalasi Lampu Indoor",
        satuan: "ttk",
        merek: "Supreme NYA",
        harga: "Rp 180.000 – Rp 249.000",
      },
      {
        nama: "Instalasi Lampu Indoor",
        satuan: "ttk",
        merek: "Eterna NYA",
        harga: "Rp 170.000 – Rp 240.000",
      },
      {
        nama: "Instalasi Lampu Outdoor",
        satuan: "ttk",
        merek: "Supreme NYA",
        harga: "Rp 200.000 – Rp 273.000",
      },
      {
        nama: "Instalasi Lampu Outdoor",
        satuan: "ttk",
        merek: "Eterna NYA",
        harga: "Rp 200.000 – Rp 252.000",
      },
      {
        nama: "Instalasi Lampu Outdoor",
        satuan: "ttk",
        merek: "Supreme NYM",
        harga: "Rp 200.000 – Rp 309.400",
      },
      {
        nama: "Instalasi Lampu Outdoor",
        satuan: "ttk",
        merek: "Eterna NYM",
        harga: "Rp 200.000 – Rp 273.000",
      },
      {
        nama: "Instalasi Lampu Outdoor",
        satuan: "ttk",
        merek: "Supreme NYY",
        harga: "Rp 200.000 – Rp 364.000",
      },
      {
        nama: "Instalasi Lampu Outdoor",
        satuan: "ttk",
        merek: "Eterna NYY",
        harga: "Rp 200.000 – Rp 327.600",
      },
      {
        nama: "Instalasi Lampu Hotel/ Tukar",
        satuan: "ttk",
        merek: "Supreme NYA",
        harga: "Rp 273.000",
      },
      {
        nama: "Instalasi Lampu Hotel/ Tukar",
        satuan: "ttk",
        merek: "Eterna NYA",
        harga: "Rp 236.000",
      },
      {
        nama: "Instalasi Stop Kontak",
        satuan: "ttk",
        merek: "Supreme NYA",
        harga: "Rp 200.000 – Rp 259.000",
      },
      {
        nama: "Instalasi Stop Kontak",
        satuan: "ttk",
        merek: "Eterna NYA",
        harga: "Rp 200.000 – Rp 248.000",
      },
      {
        nama: "Instalasi Line TV, Telp., Data, Jack Audio",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 163.800 – Rp 273.000",
      },
      {
        nama: "Instalasi Sensor, Otomatis",
        satuan: "ttk",
        merek: "Supreme NYA",
        harga: "Rp 236.000",
      },
      {
        nama: "Instalasi Sensor, Otomatis",
        satuan: "ttk",
        merek: "Eterna NYA",
        harga: "Rp 200.000",
      },
      {
        nama: "Instalasi Radar Air",
        satuan: "m1",
        merek: "Supreme NYA",
        harga: "Rp 175.500",
      },
      {
        nama: "Instalasi Radar Air",
        satuan: "m1",
        merek: "Eterna",
        harga: "Rp 136.500",
      },
      {
        nama: "Instalasi Timmer",
        satuan: "ttk",
        merek: "Supreme",
        harga: "Rp 182.000",
      },
      {
        nama: "Instalasi Timmer",
        satuan: "ttk",
        merek: "Eterna",
        harga: "Rp 145.500",
      },
      {
        nama: "Instalasi Arde",
        satuan: "m1",
        merek: "Supreme NYA",
        harga: "Rp 231.000",
      },
      {
        nama: "Instalasi Arde",
        satuan: "m1",
        merek: "Eterna NYA",
        harga: "Rp 210.000",
      },
      {
        nama: "Grounding System",
        satuan: "unit",
        merek: "-",
        harga: "Mulai Dari Rp 1.500.000",
      },
    ],
  },
  {
    kategori: "Penanaman Dan Bobokan",
    data: [
      { nama: "Penanaman Pipa", satuan: "m1", merek: "-", harga: "Rp 26.000" },
      {
        nama: "Penanaman Lembodos",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 13.000",
      },
      {
        nama: "Penanaman MCB Box",
        satuan: "group",
        merek: "-",
        harga: "Rp 91.000",
      },
      {
        nama: "Grounding System/ Pembumian",
        satuan: "m1",
        merek: "-",
        harga: "Rp 650.000 – Rp 1.300.000",
      },
    ],
  },
  {
    kategori: "Pemasangan Perangkat",
    data: [
      {
        nama: "MCCB",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 520.000 – Rp 1.300.000",
      },
      {
        nama: "RCCB",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 455.000 – Rp 1.040.000",
      },
      {
        nama: "MCB",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 65.000 – Rp 130.000",
      },
      {
        nama: "Saklar Tunggal",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 32.500 – Rp 71.500",
      },
      {
        nama: "Saklar Ganda",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 45.500 – Rp 65.000",
      },
      {
        nama: "Saklar Dimmer",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 325.000 – Rp 520.000",
      },
      {
        nama: "Saklar Timmer",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 455.000 – Rp 780.000",
      },
      {
        nama: "Stop Kontak",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 39.000 – Rp 65.000",
      },
      {
        nama: "Downlight",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 78.000 – Rp 117.000",
      },
      {
        nama: "Radar Air",
        satuan: "ttk",
        merek: "-",
        harga: "Rp 117.000 – Rp 182.000",
      },
    ],
  },
]);

const nonMaterials = ref([
  {
    kategori: "Biaya Instalasi Listrik",
    data: [
      { nama: "Instalasi MCCB", satuan: "ttk", harga: "Rp 80.000" },
      { nama: "Instalasi RCCB", satuan: "ttk", harga: "Rp 70.000" },
      { nama: "Instalasi RCB", satuan: "ttk", harga: "Rp 60.000" },
      { nama: "Instalasi Kabel Toufour", satuan: "ttk", harga: "Rp 20.000" },
      { nama: "Instalasi Lampu Indoor", satuan: "ttk", harga: "Rp 80.000" },
      { nama: "Instalasi Lampu Outdoor", satuan: "ttk", harga: "Rp 85.000" },
      { nama: "Instalasi Lampu Hotel", satuan: "ttk", harga: "Rp 90.000" },
      { nama: "Instalasi Stop Kontak", satuan: "ttk", harga: "Rp 85.000" },
      {
        nama: "Instalasi Line TV, Telp., Data",
        satuan: "ttk",
        harga: "Rp 85.000",
      },
      { nama: "Instalasi Segala Sensor", satuan: "ttk", harga: "Rp 70.000" },
      { nama: "Instalasi Alarm, Radar Air", satuan: "ttk", harga: "Rp 60.000" },
      { nama: "Instalasi Trimmer", satuan: "ttk", harga: "Rp 60.000" },
      { nama: "Instalasi Arde", satuan: "m1", harga: "Rp 80.000" },
    ],
  },
  {
    kategori: "Penanaman dan Pembobokan",
    data: [
      { nama: "Penanaman Pipa", satuan: "m1", harga: "Rp 10.000" },
      { nama: "Penanaman Lombodas", satuan: "ttk", harga: "Rp 5.000" },
      { nama: "Penanaman MCB Box", satuan: "group", harga: "Rp 20.000" },
      {
        nama: "GroundingSystem (Pembumiaan)",
        satuan: "m1",
        harga: "Rp 80.000",
      },
    ],
  },
  {
    kategori: "Pemasangan Perangkat",
    data: [
      { nama: "MCCB", satuan: "ttk", harga: "Rp 70.000" },
      { nama: "RCCB", satuan: "ttk", harga: "Rp 50.000" },
      { nama: "MCB", satuan: "ttk", harga: "Rp 30.000" },
      { nama: "Saklar Tunggal", satuan: "ttk", harga: "Rp 5.000" },
      { nama: "Saklar Ganda", satuan: "ttk", harga: "Rp 10.000" },
      { nama: "Saklar Dimmer", satuan: "ttk", harga: "Rp 15.000" },
      { nama: "Saklar Tombol (Switch)", satuan: "ttk", harga: "Rp 15.000" },
      { nama: "Saklar Tarik", satuan: "ttk", harga: "Rp 20.000" },
      { nama: "Stop Kontak", satuan: "ttk", harga: "Rp 15.000" },
      { nama: "Line TV, Telp., Data", satuan: "ttk", harga: "Rp 40.000" },
      { nama: "Downlight", satuan: "ttk", harga: "Rp 30.000" },
      { nama: "Sensor Otomatis Lampu", satuan: "ttk", harga: "Rp 30.000" },
      { nama: "Radar Air, Alarm", satuan: "ttk", harga: "Rp 35.000" },
    ],
  },
  {
    kategori: "Pemasangan Elektrikal",
    data: [
      { nama: "AC", satuan: "unit", harga: "Rp 450.000" },
      { nama: "Exhaust Fan", satuan: "unit", harga: "Rp 80.000" },
      { nama: "Kipas Angin", satuan: "unit", harga: "Rp 80.000" },
      { nama: "Ceiling Fan", satuan: "unit", harga: "Rp 70.000" },
      { nama: "Downlight LED", satuan: "ttk", harga: "Rp 35.000" },
      { nama: "Lampu Gantung", satuan: "ttk", harga: "Rp 50.000" },
      { nama: "Lampu Dinding", satuan: "ttk", harga: "Rp 40.000" },
      { nama: "Lampu Spotlight", satuan: "ttk", harga: "Rp 25.000" },
      { nama: "Lampu Hologen", satuan: "ttk", harga: "Rp 20.000" },
    ],
  },
]);

const notesMaterial = ref([
  "Untuk sambungan “lampu seri” ada biaya tambahan sebesar Rp 50.000 per titik.",
  "Harga di atas menggunakan material kabel SNI dengan ukuran sebagai berikut:",
  "Kabel lampu: 1,5 mm²",
  "Kabel stop kontak: 2,5 mm²",
  "Kabel arde: 2,5 mm²",
  "Kabel induk/toufur: 3×4 mm²",
  "Harga tersebut di atas dapat berubah sesuai dengan faktor-faktor berikut:",
  "Merek",
  "Jenis",
  "Kode seri",
  "Model",
  "Nilai Watt",
  "Tingkat kesulitan",
  "Volume pekerjaan",
  "Jarak",
]);

const notesNonMaterial = ref([
  "Instalasi / titik lampu adalah antara dari titik MCB ke titik saklar ke titik lampu.",
  "Untuk sambungan “lampu seri” ada biaya tambahan Rp. 20.000/ titik.",
  "Apabila downlight tertanam pada beton/cor, akan terdapat biaya tambahan Rp 25.000/ titik.",
  "Minimal 50 titik.",
  "Biaya Pemeriksaan dan Perbaikan Rp. 275.000,- (harga sudah termasuk biaya transport).",
]);
</script>
