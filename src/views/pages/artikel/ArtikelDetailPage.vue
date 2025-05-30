<template>
  <div class="container-fluid artikel-detail-heroes"></div>
  <div class="container-fluid page">
    <div class="container mt-5 mb-5">
      <div class="row d-flex flex-column flex-md-row">
        <!-- Artikel Utama -->
        <div class="col-12 col-md-7 order-1 order-md-2">
          <div v-if="loading" class="text-center mt-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div
            v-else-if="article"
            class="row align-items-start justify-content-start"
          >
            <h1 class="text-start">{{ article.title }}</h1>
            <p class="text-start">Ditulis oleh: {{ article.author }}</p>
            <img :src="article.thumbnail" alt="" class="thumbnail mb-3" />
            <!-- <div class="col text-justify">
              <p>{{ article.content }}</p>
            </div> -->
            <div
              v-html="article.content"
              class="col text-justify formatted-content"
            ></div>
          </div>

          <div v-else class="text-center mt-5">
            <p class="text-danger">Artikel tidak ditemukan.</p>
          </div>
        </div>

        <!-- Artikel Terkait -->
        <div class="col-12 col-md-2 order-2 order-md-1 articles mt-3 mt-md-0">
          <div
            v-for="(artikel, index) in articles"
            :key="index"
            class="text-start"
          >
            <div class="card m-1 shadow-sm">
              <div class="card-body m-0 p-2">
                <img
                  :src="artikel.thumbnail"
                  alt=""
                  class="img-articles rounded"
                />

                <!-- Router Link untuk Navigasi -->
                <router-link
                  :to="`/coding-and-iot/${artikel.slug}`"
                  class="fw-bold fs-7 mt-2 text-decoration-none d-block"
                >
                  {{ artikel.title }}
                </router-link>
                <div
                  v-html="artikel.content.split(' ').slice(0, 10).join(' ')"
                  class="col formatted-content"
                ></div>
                <!-- <p class="mb-0">
                  {{ artikel.content.split(" ").slice(0, 10).join(" ") }}...
                </p> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Fun Activity -->
        <div class="col-12 col-md-3 order-1 order-md-3">
          <div class="toc p-2 border rounded shadow-sm bg-light">
            <!-- <h6 class="fw-bold">Daftar Isi</h6> -->
            <div
              v-for="(kategori, index) in tocItems"
              :key="index"
              class="mb-3"
            >
              <p class="fw-semibold mb-1">{{ kategori.kategori }}</p>
              <ul class="list-unstyled small ps-2">
                <li
                  v-for="(item, subIndex) in kategori.items"
                  :key="subIndex"
                  class="mb-1"
                >
                  <a href="#" class="text-decoration-none">{{ item }}</a>
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
.artikel-detail-heroes {
  min-height: 30vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
    url("../../../assets/hero-img.jpg");
  background-size: cover;
  display: flex;
}

.page {
  min-height: 100vh;
}

.text-justify {
  text-align: justify;
}

.articles {
  font-size: 12px;
}

.img-articles {
  width: 100%;
  height: 70px;
  object-fit: cover;
}

.cursor-pointer {
  cursor: pointer;
}

.thumbnail {
  height: 250px;
  width: 100%; /* Ubah jadi 100% supaya memenuhi kolom */
  object-fit: cover; /* Biar gambar proporsional */
}

.formatted-content img {
  max-width: 100%; /* Mengatur lebar maksimal gambar sesuai dengan parent */
  height: auto; /* Menjaga rasio gambar */
  border-radius: 8px; /* Opsional: membuat gambar memiliki sudut membulat */
  margin: 10px 0; /* Opsional: memberi jarak atas dan bawah pada gambar */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Opsional: menambah efek bayangan */
}

.toc {
  /* font-size: 13px; */
  position: sticky;
  top: 80px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
// import FunActivity from "../layouts/FunActivity.vue";

export default {
  // components: { FunActivity },
  setup() {
    const route = useRoute();
    // const router = useRouter();
    const article = ref(null);
    const articles = ref([]);
    const loading = ref(false);

    // Fungsi mengambil daftar artikel
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/artikels");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        let data = await response.json();
        data = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        articles.value = data;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    // Fungsi mengambil data artikel berdasarkan slug
    const fetchData = async (slug) => {
      loading.value = true;
      article.value = null;

      try {
        const response = await fetch(
          `http://localhost:3001/api/artikels/${slug}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        let data = await response.json();
        article.value = data;
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        loading.value = false;
      }
    };

    const tocItems = ref([
      {
        kategori: "Listrik",
        items: [
          "Dasar-dasar Kelistrikan",
          "Hukum Ohm",
          "Jenis Rangkaian Listrik",
          "Instalasi Listrik Rumah Tangga",
          "Panel Listrik dan Komponennya",
          "Pengaman Listrik: MCB & ELCB",
          "Motor Listrik dan Aplikasinya",
          "Teknik Pengukuran Listrik",
          "Perawatan Sistem Kelistrikan",
          "Keselamatan Kerja Listrik",
        ],
      },
      {
        kategori: "Website Development",
        items: [
          "Pengenalan HTML & CSS",
          "Dasar JavaScript",
          "Struktur Proyek Web Modern",
          "Responsive Web Design",
          "Framework CSS (Bootstrap, Tailwind)",
          "Routing Frontend (Vue Router)",
          "API dan AJAX Request",
          "Form Handling dan Validasi",
          "Deployment Website",
          "Optimasi Kecepatan Website",
        ],
      },
      {
        kategori: "IoT Development",
        items: [
          "Apa itu IoT?",
          "Platform IoT Populer",
          "Sensor dan Aktuator",
          "Komunikasi IoT (WiFi, MQTT, ESP-NOW)",
          "Mikrokontroler ESP32",
          "Web Dashboard untuk IoT",
          "Integrasi Node-RED",
          "Penyimpanan Data IoT",
          "Keamanan IoT Dasar",
          "Contoh Proyek IoT Sederhana",
        ],
      },
    ]);

    // Pantau perubahan slug dan perbarui data tanpa refresh
    watch(
      () => route.params.slug,
      (newSlug) => {
        fetchData(newSlug);
      }
    );

    onMounted(() => {
      fetchData(route.params.slug);
      fetchArticles();
    });

    return {
      article,
      articles,
      loading,
      tocItems,
    };
  },
};
</script>
