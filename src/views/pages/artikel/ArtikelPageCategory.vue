<template>
  <!-- HERO -->
  <div class="container-fluid artikel-category-heroes d-flex align-items-end justify-content-center text-center py-4">
    <div class="hero-content w-100">

      <!-- TITLE -->
      <h1 class="title-artikel-category-page fw-bold text-white mb-md-4 mb-3">
        {{ category.name }} <br> <span class="text-warning">Category</span>
      </h1>

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
  <div class="p-4 pt-4">
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
    <div class="row pt-3">
      <div
        class="col-md-4 mb-4"
        v-for="artikel in category.Artikels"
        :key="artikel.id"
      >
        <div class="artikel-card artikel-card-md">
          <img :src="artikel.thumbnail" class="artikel-img" />

          <div class="artikel-info p-3 text-white">
            <h6 class="mb-1">{{ artikel.title }}</h6>
            <!-- <p class="penulis mb-0">
              <i class="bi bi-pen me-1"></i> {{ artikel.author }}
                    <i class="bi bi-calendar-check me-1 ms-3"></i>
                    {{ formatDate(artikel.updatedAt) }}
            </p> -->
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
    const category = ref({});
    const categories = ref([]);
    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    const fetchCategory = async (slug) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/${slug}`);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        category.value = data;
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fecthCategories = async () => {
      try {
        const response =  await fetch(`${API_BASE_URL}/api/categories`);
        if(!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        categories.value = data;
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    } 

    watch(
      () => route.params.slug,
      (newSlug) => {
        fetchCategory(newSlug);
      }
    );

    onMounted(() => {
      fetchCategory(route.params.slug);
      fecthCategories();
    });

    return { category, categories };
  },
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
    font-size: 35px; 
  } 
}
</style>
