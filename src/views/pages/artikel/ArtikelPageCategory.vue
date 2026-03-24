<template>
  <!-- HERO -->
  <div
    class="container-fluid artikel-category-heroes d-flex align-items-end justify-content-start text-start py-4"
  >
    <div class="container-xxl ">
      <div class="hero-content w-100">
        <div class="row">
          <div class="col-12 col-lg-8 d-flex align-items-center justify-content-start">
            <!-- TITLE -->
            <h1
              class="title-artikel-category-page fw-bold text-white mb-md-4 mb-3"
            >
              <span class="text-warning"
                >Category : </span>{{ category.name }} 
              
            </h1>
          </div>
          <div
            class="col-4 col-md-4 text-center d-flex align-items-center justify-content-center d-none d-lg-block"
          >
            <img
              src="../../../assets/guru_ngulik.png"
              alt=""
              style="height: 200px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- MAIN PAGE -->
  <div class="container-xxl p-4 pt-4">
    <div class="row mb-3">
      <div class="col-12">
        <div class="category-wrap mt-3">
          <!-- Home -->
          <router-link
            to="/artikel"
            class="category-pill"
            :class="{ active: $route.path === '/artikel' }"
          >
            All Article
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

          <router-link :to="`/artikel/${artikel.slug}`" class="artikel-overlay">
            <span class="see-more-text">See More</span>
          </router-link>
        </div>
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
    const category = ref({});
    const categories = ref([]);
    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    const router = useRouter();
    const searchQuery = ref("");
    const selectedCategory = ref("");

    const fetchCategory = async (slug) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/categories/category/${slug}`,
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        category.value = data;
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    const fetchCategories = async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      categories.value = await res.json();
    };

    const goToSearch = () => {
      if (!searchQuery.value && !selectedCategory.value) return;

      router.push({
        path: "/artikel/search",
        query: {
          search: searchQuery.value || undefined,
          category_id: selectedCategory.value || undefined,
        },
      });
    };

    watch(
      () => route.params.slug,
      (newSlug) => {
        fetchCategory(newSlug);
      },
    );

    onMounted(() => {
      fetchCategory(route.params.slug);
      fetchCategories();
    });

    return {
      category,
      categories,
      searchQuery,
      selectedCategory,
      goToSearch,
    };
  },
};
</script>

<style>
.artikel-category-heroes {
  height: 320px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)),
    url("../../../assets/img_hero_all.PNG");
  background-size: cover;
  background-position: bottom;
  position: relative;
  z-index: 2;
}

.title-artikel-category-page {
  font-size: 50px;
}

.title-artikel-category-page .container-xxl {
  position: relative;
  z-index: 2;
}

/* CATEGORY WRAPPER */
.category-wrap {
  display: flex;
  flex-wrap: wrap; /* 🔥 turun ke baris bawah */
  gap: 10px;
  justify-content: center; /* tengah desktop */
}

/* PILL STYLE */

@media (max-width: 767px) {
  .artikel-category-heroes {
    height: 30vh;
  }

  .title-artikel-category-page {
    font-size: 25px;
  }
}
</style>
