<template>
  <!-- HERO -->
  <div
    class="container-fluid artikel-search-heroes d-flex align-items-end justify-content-center text-center py-4"
  >
    <div class="container-xxl">
      <div class="hero-content w-100">
        <!-- SEARCH -->
        <h1 class="title-artikel-serach-page fw-bold text-white mb-md-5 mb-3">
          Article Search Page
        </h1>
        <div
          class="row justify-content-center g-2 align-items-center mb-2 mb-md-5"
        >
          <!-- Input search -->
          <div class="col-6 col-md-4">
            <input
              v-model="searchInput"
              @keyup.enter="goToSearch"
              type="text"
              class="form-control"
              placeholder="Cari artikel..."
            />
          </div>

          <!-- Filter kategori -->
          <div class="col-4 col-md-2">
            <select class="form-select" v-model="selectedCategory">
              <option value="">Semua kategori</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
          </div>

          <!-- Search Button -->
          <div class="col-auto">
            <button class="search-btn border-0" @click="goToSearch">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MAIN PAGE -->
  <div class="container-xxl py-4 p-4 pb-5">
    <h4 class="mb-3 mt-3">
      Hasil pencarian untuk:
      <span v-if="searchQuery" class="text-warning">
        {{ searchQuery }}
        <span class="fs-6 text-secondary">
          <br />
          ( {{ total }} Artikel Ditemukan )</span
        >
        <!-- </p> -->
      </span>
    </h4>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border"></div>
    </div>

    <!-- EMPTY -->
    <div v-else-if="!articles.length" class="text-center py-5 text-muted">
      Artikel tidak ditemukan 😥
    </div>

    <!-- RESULT -->
    <div v-else class="row row-cols-1 row-cols-md-3 g-4 py-5">
      <div v-for="artikel in articles" :key="artikel.id" class="col">
        <router-link
          :to="`/artikel/${artikel.slug}`"
          class="text-decoration-none"
        >
          <div class="article-card">
            <!-- IMAGE -->
            <div class="article-img">
              <img :src="artikel.thumbnail" alt="" />

              <!-- BADGE -->
              <div
                :class="[
                  'hero-category',
                  getCategoryClass(artikel.Category_Artikel?.name),
                ]"
              >
                {{ artikel.Category_Artikel?.name }}
              </div>
            </div>

            <!-- CONTENT -->
            <div class="article-content">
              <h5>{{ artikel.title }}</h5>

              <p>
                {{ artikel.excerpt || "Artikel menarik, baca selengkapnya..." }}
              </p>

              <div class="article-meta">
                <span><i class="bi bi-eye"></i> {{ artikel.views }}</span>
                <span><i class="bi bi-chat-dots"></i> 86</span>
              </div>
            </div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    const articles = ref([]);
    const categories = ref([]);
    const total = ref(0);
    const loading = ref(false);

    // dari URL
    const searchQuery = ref(route.query.search || "");
    const categoryId = ref(route.query.category_id || "");

    // input form
    const searchInput = ref(searchQuery.value);
    const selectedCategory = ref(categoryId.value);

    const fetchCategories = async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      categories.value = await res.json();
    };

    const fetchSearchResult = async () => {
      loading.value = true;

      const params = new URLSearchParams();
      if (searchQuery.value) params.append("search", searchQuery.value);
      if (categoryId.value) params.append("category_id", categoryId.value);

      const res = await fetch(
        `${API_BASE_URL}/api/artikels?${params.toString()}`,
      );
      const result = await res.json();

      articles.value = result.data || [];
      total.value = result.total || 0;
      loading.value = false;
    };

    const goToSearch = () => {
      if (!searchInput.value && !selectedCategory.value) return;

      router.push({
        path: "/artikel/search",
        query: {
          search: searchInput.value || undefined,
          category_id: selectedCategory.value || undefined,
        },
      });
    };

    const getCategoryClass = (name) => {
      if (!name) return "cat-default";

      const map = {
        "internet of thing (iot)": "cat-iot",
        electrical: "cat-listrik",
        "web development": "cat-webdev",
      };

      return map[name.toLowerCase()] || "cat-default";
    };

    onMounted(() => {
      fetchCategories();
      fetchSearchResult();
    });

    watch(
      () => route.query,
      (q) => {
        searchQuery.value = q.search || "";
        categoryId.value = q.category_id || "";

        searchInput.value = searchQuery.value;
        selectedCategory.value = categoryId.value;

        fetchSearchResult();
      },
    );

    const formatDate = (dateString) =>
      new Date(dateString).toLocaleDateString("id-ID");

    return {
      articles,
      categories,
      total,
      loading,
      searchQuery,
      searchInput,
      selectedCategory,
      goToSearch,
      formatDate,
      getCategoryClass,
    };
  },
};
</script>

<style>
/* HERO */
.artikel-search-heroes {
  height: 320px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/hero-img.webp");
  background-size: cover;
}

/* CARD */
.artikel-search-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  height: 260px;
}

.artikel-search-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

/* INFO */
.artikel-search-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 2;
}

/* OVERLAY */
.artikel-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none; /* 🔥 KUNCI */
  transition: opacity 0.3s ease;
  z-index: 3;
  text-decoration: none;
}

/* BUTTON */
.see-more-text {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 6px 36px;
  border: 2px solid #fff;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* HOVER EFFECT */
.artikel-search-card:hover .artikel-overlay {
  opacity: 1;
  pointer-events: auto;
}

.artikel-search-card:hover .artikel-search-img {
  transform: scale(1.05);
}

.artikel-search-card:hover .see-more-text {
  background: #fff;
  color: #000;
}

/* TEXT */
.penulis {
  font-size: 12px;
}

/* SEARCH BUTTON */
.search-btn {
  width: 42px;
  height: 42px;
  border-radius: 20%;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
}

.search-btn:hover {
  background: #ffc107;
  color: #000;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .artikel-search-heroes {
    height: 30vh;
  }

  .title-artikel-serach-page {
    font-size: 25px;
  }
}
</style>
