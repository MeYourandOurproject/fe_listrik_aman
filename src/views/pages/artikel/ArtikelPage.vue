<template>
  <!-- HERO -->
  <div class="container-fluid artikel-home-heroes d-flex align-items-end justify-content-center text-center py-4">
    <div class="hero-content w-100">

      <!-- TITLE -->
      <h1 class="title-artikel-home-page fw-bold text-white mb-md-5 mb-3">
        Learn Electrical and IoT for <br />Smart Home Applications
      </h1>

      <!-- SEARCH -->
      <div class="row justify-content-center g-2 align-items-center mb-md-5 mb-2">

        <!-- Input search -->
        <div class="col-6 col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="Cari artikel..."
            v-model="searchQuery"
            @keyup.enter="goToSearch"
          />
        </div>

        <!-- Filter kategori -->
        <div class="col-4 col-md-2">
          <select
            class="form-control"
            v-model="selectedCategory"
          >
            <option value="">Semua kategori</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Search Button -->
        <div class="col-auto">
          <button
            class="search-btn border-0"
            @click="goToSearch"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>

      </div>
    </div>
  </div>

  <!-- MAIN PAGE -->
  <div class="pt-4 p-4">
    <div class="row mb-3">
      <div class="col-12">
        <div class="category-wrap">

          <!-- Home -->
          <router-link
            to="/artikel"
            class="category-pill"
            :class="{ active: $route.path === '/artikel' }"
          >
            Home
          </router-link>

          <!-- Category -->
          <router-link
            v-for="category in categories"
            :key="category.slug"
            :to="`/artikel/kategori/${category.slug}`"
            class="category-pill"
            :class="{ active: $route.params.slug === category.slug }"
          >
            {{ category.name }}
          </router-link>

        </div>
      </div>
    </div>
    <div class="row py-3">
      <!-- CAROUSEL -->
      <div class="col-md-8 mb-3">
        <div
          v-if="carouselArticles.length"
          id="mainCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner rounded shadow">
            <div
              v-for="(artikel, index) in carouselArticles"
              :key="artikel.slug"
              class="carousel-item"
              :class="{ active: index === 0 }"
            >
              <div class="artikel-card artikel-card-lg">
                <img :src="artikel.thumbnail" class="artikel-img" />

                <span class="badge bg-danger position-absolute top-0 start-0 m-3 z-3">
                  Terbaru
                </span>

                <div class="artikel-info py-4 ps-4 text-white">
                  <h2 class="fw-bold mb-1">{{ artikel.title }}</h2>
                  <p class="penulis mb-0">
                    <i class="bi bi-pen me-1"></i> {{ artikel.author }}
                    <i class="bi bi-calendar-check ms-3 me-1"></i>
                    {{ formatDate(artikel.updatedAt) }}
                  </p>
                </div>

                <!-- OVERLAY -->
                <router-link
                  :to="`/artikel/${artikel.slug}`"
                  class="artikel-overlay"
                >
                  <span class="see-more-text">See More</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- CONTROLS -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon"></span>
          </button>

          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      <!-- SIDE ARTICLES -->
      <div class="col-md-4 d-flex flex-column gap-3">
        <div
          v-for="artikel in sideArticles"
          :key="artikel.slug"
          class="artikel-card artikel-card-sm"
        >
          <img :src="artikel.thumbnail" class="artikel-img" />

          <div class="artikel-info p-3 text-white">
            <h6 class="mb-1">{{ artikel.title }}</h6>
            <p class="penulis mb-0">
              <i class="bi bi-pen me-1"></i> {{ artikel.author }}
                    <i class="bi bi-calendar-check me-1 ms-3"></i>
                    {{ formatDate(artikel.updatedAt) }}
            </p>
          </div>

          <router-link
            :to="`/artikel/${artikel.slug}`"
            class="artikel-overlay"
          >
            <span class="see-more-text">See More</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- OTHER ARTICLES -->
    <div class="row row-cols-1 row-cols-md-3 g-3 mt-4">
      <div v-for="artikel in otherArticles" :key="artikel.slug" class="col">
        <div class="artikel-card artikel-card-md">
          <img :src="artikel.thumbnail" class="artikel-img" />

          <div class="artikel-info p-3 text-white">
            <h6 class="mb-1">{{ artikel.title }}</h6>
            <p class="penulis mb-0">
              <i class="bi bi-pen me-1"></i> {{ artikel.author }}
                    <i class="bi bi-calendar-check me-1 ms-3"></i>
                    {{ formatDate(artikel.updatedAt) }}
            </p>
          </div>

          <router-link
            :to="`/artikel/${artikel.slug}`"
            class="artikel-overlay"
          >
            <span class="see-more-text">See More</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const articles = ref([]);
    const categories = ref([]);
    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
    const router = useRouter();
    const searchQuery = ref("");
    const selectedCategory = ref("");

    const fetchArticles = async () => {
      const res = await fetch(`${API_BASE_URL}/api/artikels`);
      const result = await res.json();
      // articles.value = result.sort(
      //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      // );
      articles.value = result.data;
    };

    const fetchCategories = async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      categories.value = await res.json();
    };

    const formatDate = (dataString) => {
      const date = new Date(dataString);
      return date.toLocaleString("id-ID");
    };

    const goToSearch = () => {
      if (!searchQuery.value && !selectedCategory.value) return;

      router.push({
        path: "/artikel/search",
        query: {
          search: searchQuery.value || undefined,
          category_id: selectedCategory.value || undefined
        }
      });
    };

    const carouselArticles = computed(() => articles.value.slice(0, 3));
    const sideArticles = computed(() => articles.value.slice(3, 5));
    const otherArticles = computed(() => articles.value.slice(5));

    onMounted(() => {
      fetchArticles();
      fetchCategories();
    });

    return {
      categories,
      carouselArticles,
      sideArticles,
      otherArticles,
      formatDate,
      searchQuery,
      selectedCategory,
      goToSearch
    };
  },
};
</script>

<style>
/* HERO */
.artikel-home-heroes {
  height: 420px;
  background-image: linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.8)),
    url("../../../assets/hero-img.jpg");
  background-size: cover;
}

.title-artikel-home-page {
  font-size: 50px;
}

/* CARD */
.artikel-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.artikel-card-lg { height: 480px; }
.artikel-card-md { height: 260px; }
.artikel-card-sm { height: 232px; }

.artikel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

/* INFO */
.artikel-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.55);
  backdrop-filter: blur(4px);
  z-index: 2;
}

/* OVERLAY */
.artikel-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none; /* 🔥 INI KUNCINYA */
  transition: opacity 0.3s ease;
  z-index: 3;
  text-decoration: none;
}

.see-more-text {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 50px;
  border: 2px solid #fff;
  border-radius: 10px;
  transition: all 0.3s ease;
}

/* HOVER */
.artikel-card:hover .artikel-overlay {
  opacity: 1;
  pointer-events: auto; /* aktif hanya saat hover */
}

.artikel-card:hover .artikel-img {
  transform: scale(1.05);
}

.artikel-card:hover .see-more-text {
  background: #fff;
  color: #000;
}

/* FIX CAROUSEL */
.carousel-control-prev,
.carousel-control-next {
  z-index: 10;
}

/* TEXT */
.penulis {
  font-size: 12px;
}

/* CATEGORY WRAPPER */
.category-wrap {
  display: flex;
  flex-wrap: wrap;           /* 🔥 turun ke baris bawah */
  gap: 10px;
  justify-content: center;   /* tengah desktop */
}

/* PILL STYLE */
.category-pill {
  padding: 8px 18px;
  border-radius: 50px;
  border: 1px solid #ccc;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;
  background: #fff;
  transition: all 0.25s ease;
}

/* Hover */
.category-pill:hover {
  background: #111;
  color: #fff;
  border-color: #111;
}

/* Active */
.category-pill.active {
  background: #111;
  color: #fff;
  border-color: #111;
  font-weight: 600;
}

/* MOBILE OPTIMIZATION */
@media (max-width: 576px) {
  .category-wrap {
    justify-content: flex-center; /* kiri di HP */
  }

  .category-pill {
    font-size: 13px;
    padding: 7px 14px;
  }
}

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
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(6px);
}

.search-btn:hover {
  background: #ffc107;
  color: #000;
  transform: scale(1.1) ;
}

.search-btn:active {
  transform: scale(0.95);
}

@media (max-width: 767px) { 
  .artikel-home-heroes{ 
    height: 32vh; 
  } 

  .title-artikel-home-page { 
    font-size: 25px; 
  } 
}
</style>
