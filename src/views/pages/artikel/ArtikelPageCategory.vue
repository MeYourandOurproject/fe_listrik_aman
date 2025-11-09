<template>
  <!-- HERO -->
  <div
    class="container-fluid artikel-heroes d-flex align-items-end justify-content-center text-center py-5"
  >
   <h1 class="title-artikel-page fw-bold text-white">
     {{ category.name }}
   </h1>
  </div>

  <!-- DAFTAR ARTIKEL -->
  <div class="p-4">
    <div class="row mb-3">
      <div class="col-12">
        <!-- Tombol Home -->
        <router-link
          to="/artikel"
          class="btn btn-outline-dark fs-6 m-2"
        >
          Home
        </router-link>

        <!-- Tombol Kategori -->
        <router-link
          v-for="(category, index) in categories"
          :key="index"
          :to="`/artikel/kategori/${category.slug}`"
          class="btn btn-outline-dark fs-6 m-2"
        >
          {{ category.name }}
        </router-link>
      </div>
    </div>
    <div class="row p-2">
      <div
        class="col-md-3 mb-4"
        v-for="artikel in category.Artikels"
        :key="artikel.id"
      >
        <div class="card h-100 shadow-sm">
          <div class="card-body d-flex flex-column gap-2">
            <img :src="artikel.thumbnail" alt="" class="w-100 rounded" style="object-fit: cover; height: 100px">
            <h7 class="card-title fst-italic text-center">{{ artikel.title }}</h7>
            <router-link
              :to="`/artikel/${artikel.slug}`"
              class="btn btn-sm btn-outline-dark"
            >
              Selengkapnya...
            </router-link>
          </div>
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
.artikel-heroes {
  height: 45vh;
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8)),
    url("../../../assets/hero-img.jpg");
  background-size: cover;
  display: flex;
}

.title-artikel-page {
  font-size: 50px;
  font-weight: bold;
}

@media (max-width: 767px) {
  .artikel-heroes {
    height: 35vh;
  }
  .title-artikel-page {
    font-size: 40px;
  }
}
</style>
