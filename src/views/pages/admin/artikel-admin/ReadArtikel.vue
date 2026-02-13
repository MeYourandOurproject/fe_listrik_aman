<template>
  <div class="container-fluid artikel-detail-heroes"></div>
  <div class="container-fluid page">
    <div class="pt-5 pb-5">
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
            <img
              :src="article.thumbnail"
              class="w-100"
              style="object-fit: cover; height: 480px"
            />  
            <span class="mt-3">
              <h1 class="text-start fw-bold mb-3">{{ article.title }} </h1>
              <p class="text-start bg-light p-1 ps-2 rounded-1 border">
                <i class="bi bi-pen me-1"></i> Writen by : {{ article.author }}<i class="bi bi-calendar-check me-1 ms-3"></i> Last update : {{ formateDate(article.updatedAt) }} <i class="bi bi-bookmarks me-1 ms-3"></i> Category : {{ article.Category_Artikel.name }}
              </p>
              <p class="border-bottom border-1 border-dark"></p>
            </span>
            

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
        <div class="col-12 col-md-2 order-3 order-md-1 articles">
          <div class="toc p-2 border rounded shadow-sm bg-light">
            <h4 class="fw-bold bg-dark text-light text-center rounded p-2">Artikel Terkait</h4>
            <div
              v-for="(artikel, index) in articles"
              :key="index"
              class="text-start"
            >
              <div class="card mb-1 shadow-sm">
                <div class="card-body m-0 p-2">
                  <img
                    :src="artikel.thumbnail"
                    alt=""
                    class="img-articles rounded"
                  />
                  <router-link
                    :to="`/artikel/${artikel.slug}`"
                    class="fs-7 mt-2 text-decoration-none d-block artikel-link"
                  >
                    {{ artikel.title }}
                  </router-link>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <!-- Artikel Kategori -->
        <div class="col-12 col-md-3 order-2 order-md-2">
          <div class="toc p-2 border rounded shadow-sm bg-light">
            <h4 class="fw-bold bg-dark text-light text-center rounded p-2">Artikel Kategori</h4>

            <div class="accordion" id="accordionKategori">
              <div
                class="accordion-item"
                v-for="(category, index) in categories"
                :key="index"
              >
                <h2 class="accordion-header" :id="`heading-${index}`">
                  <button
                    class="accordion-button fst-italic"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#collapse-${index}`"
                    :aria-controls="`collapse-${index}`"
                    :aria-expanded="index === 0 ? 'true' : 'false'"
                    :class="{ collapsed: index !== 0 }"
                  >
                    {{ category.name }}
                  </button>
                </h2>
                <div
                  :id="`collapse-${index}`"
                  class="accordion-collapse collapse"
                  :class="{ show: index === 0 }"
                  :aria-labelledby="`heading-${index}`"
                >
                  <div class="accordion-body">
                    <ul class="list-unstyled small ps-2 mb-0">
                      <li
                        v-for="(artikel, aIndex) in category.Artikels"
                        :key="aIndex"
                        class="mb-1"
                      >
                        <router-link
                          :to="`/artikel/${artikel.slug}`"
                          class="text-decoration-none artikel-link"
                        >
                          {{ artikel.title }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
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

.artikel-link {
  display: block;
  padding: 4px 0;
  color: #333;
  transition: all 0.2s ease;
}

.artikel-link:hover {
  transform: translateX(3px);
  color: #0d6efd; /* biru Bootstrap */
}

.accordion-body li {
  border-bottom: 1px solid #ddd;
  padding-bottom: 4px;
  margin-bottom: 4px;
}

.accordion-body li:last-child {
  border-bottom: none; /* hilangkan garis di akhir */
}
</style>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const article = ref(null);
    const articles = ref([]);
    const categories = ref([]);
    const loading = ref(false);

    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
    const token = localStorage.getItem("token");

    // Fungsi mengambil daftar artikel
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/artikels/admin`,
          {
            method: "GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        articles.value = result.data;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    // Fungsi mengambil data artikel berdasarkan slug
    const fetchData = async (slug) => {
      loading.value = true;
      article.value = null;

      try {
        const response = await fetch(`${API_BASE_URL}/api/artikels/admin/${slug}`,
          {
            method: "GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
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

    const fetchCategoryArtikel = async (id) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/admin/${id}`,
          {
            method: "GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        return null;
      }
    };

    // 🔹 Ambil beberapa kategori (misal id 1,2,3)
    const fetchAllCategories = async () => {
      try {
        // 🔹 1. Ambil semua kategori dulu (tanpa artikelnya)
        const response = await fetch(`${API_BASE_URL}/api/categories/admin`,
          {
            method: "GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (!response.ok) throw new Error("Failed to fetch category list");

        const data = await response.json();

        // 🔹 2. Ambil detail setiap kategori beserta artikelnya
        const results = [];
        for (const category of data) {
          const categoryDetail = await fetchCategoryArtikel(category.id);
          if (categoryDetail) results.push(categoryDetail);
        }

        // 🔹 3. Simpan hasilnya ke state
        categories.value = results;
      } catch (error) {
        console.error("Error fetching all categories:", error);
      }
    };

    const formateDate = (dataString) => {
      const date = new Date(dataString);
      return date.toLocaleString("id-ID");
    };

    // Pantau perubahan slug dan perbarui data tanpa refresh
    watch(
      () => route.params.slug,
      (newSlug) => {
        fetchData(newSlug);
      }
    );

    onMounted(async() => {
      fetchData(route.params.slug);
      fetchArticles();
      await fetchAllCategories();
    });

    return {
      article,
      articles,
      loading,
      // tocItems,
      formateDate,
      categories,
    };
  },
};
</script>
