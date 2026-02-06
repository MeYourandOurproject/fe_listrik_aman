<template>
  <!-- HERO -->
  <div class="container-fluid artikel-category-heroes d-flex align-items-end justify-content-center text-center py-4">
    <div class="hero-content w-100">

      <!-- SEARCH -->
      <div class="row justify-content-center g-2 align-items-center mb-2 mb-md-5">

        <!-- Input search -->
        <div class="col-6 col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="Cari artikel..."
          />
        </div>

        <!-- Filter kategori -->
        <div class="col-4 col-md-2">
          <input
            type="text"
            class="form-control"
            placeholder="Filter kategori"
          />
        </div>

        <!-- Search Button -->
        <div class="col-auto">
          <router-link
            to="/artikel"
            class="search-btn"
          >
            <i class="bi bi-search"></i>
          </router-link>
        </div>

      </div>
    </div>
  </div>

  <!-- MAIN PAGE -->
  <div class="container py-4">

    <h4 class="mb-3">
      Hasil pencarian untuk:
      <span class="text-warning">"{{ searchQuery }}"</span>
    </h4>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-warning"></div>
    </div>

    <div v-else-if="articles.length === 0" class="text-center py-5">
      <p>Tidak ada artikel ditemukan 😢</p>
    </div>

    <div v-else class="row row-cols-1 row-cols-md-3 g-3">
      <div v-for="artikel in articles" :key="artikel.slug" class="col">
        <div class="artikel-card artikel-card-md">
          <img :src="artikel.thumbnail" class="artikel-img" />

          <div class="artikel-info p-3 text-white">
            <h6 class="mb-1">{{ artikel.title }}</h6>
            <p class="penulis mb-0">
              <i class="bi bi-pen me-1"></i> {{ artikel.author }}
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const articles = ref([]);
    const isLoading = ref(false);
    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    const searchQuery = ref(route.query.q || "");

    const fetchSearchResult = async () => {
      if (!searchQuery.value) return;

      try {
        isLoading.value = true;

        const res = await fetch(
          `${API_BASE_URL}/api/artikels?search=${searchQuery.value}`
        );
        const result = await res.json();

        articles.value = result.data;
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchSearchResult);

    watch(
      () => route.query.q,
      (val) => {
        searchQuery.value = val;
        fetchSearchResult();
      }
    );

    return {
      articles,
      isLoading,
      searchQuery
    };
  }
};
</script>


<style>
.artikel-category-heroes {
  height: 50vh;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8)),
    url("../../../assets/hero-img.jpg");
  background-size: cover;
  /* display: flex; */
}

.title-artikel-category-page {
  font-size: 50px;
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

@media (max-width: 767px) { 
  .artikel-category-heroes{ 
    height: 32vh; 
  } 

  .title-artikel-category-page { 
    font-size: 25px; 
  } 
}
</style>
