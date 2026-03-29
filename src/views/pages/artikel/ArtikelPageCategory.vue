<template>
  <!-- HERO -->
  <div
    class="container-fluid artikel-category-heroes d-flex align-items-end justify-content-start text-start py-4"
  >
    <div class="container-xxl">
      <div class="hero-content w-100">
        <div class="row">
          <div
            class="col-12 col-lg-8 d-flex align-items-center justify-content-start"
          >
            <h1
              class="title-artikel-category-page fw-bold text-white mb-md-4 mb-3"
            >
              <span class="text-warning">Category : </span>{{ category.name }}
            </h1>
          </div>

          <div
            class="col-4 text-center d-flex align-items-center justify-content-center d-none d-lg-block"
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

  <!-- MAIN -->
  <div class="container-xxl p-4 pt-4">
    <!-- CATEGORY NAV -->
    <div class="row mb-3">
      <div class="col-12">
        <div class="category-wrap mt-3">
          <router-link
            to="/artikel"
            class="category-pill"
            :class="{ active: $route.path === '/artikel' }"
          >
            All Article
          </router-link>

          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/artikel/kategori/${cat.slug}`"
            class="category-pill"
            :class="{ active: $route.params.slug === cat.slug }"
          >
            {{ cat.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- ARTICLE LIST -->
    <div class="row pt-3">
      <div
        class="col-md-4 mb-4"
        v-for="artikel in category.Artikels"
        :key="artikel.id"
      >
        <router-link
          :to="`/artikel/${artikel.slug}`"
          class="text-decoration-none"
        >
          <div class="article-card">
            <!-- IMAGE -->
            <div class="article-img">
              <img :src="artikel.thumbnail" alt="" />

              <!-- BADGE -->
              <div :class="['hero-category', categoryClass]">
                {{ category.name }}
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
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    const category = ref({});
    const categories = ref([]);

    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    const fetchCategory = async (slug) => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/categories/category/${slug}`,
        );
        const data = await res.json();
        category.value = data;
      } catch (err) {
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      categories.value = await res.json();
    };

    const categoryClass = computed(() => {
      const slug = category.value?.slug;

      const map = {
        "internet-of-thing": "cat-iot",
        electrical: "cat-listrik",
        "web-development": "cat-webdev",
      };

      return map[slug] || "cat-default";
    });

    watch(
      () => route.params.slug,
      (slug) => {
        fetchCategory(slug);
      },
    );

    onMounted(() => {
      fetchCategory(route.params.slug);
      fetchCategories();
    });

    return {
      category,
      categories,
      categoryClass,
    };
  },
};
</script>

<style>
/* HERO */
.artikel-category-heroes {
  height: 320px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
    url("../../../assets/img_hero_all.PNG");
  background-size: cover;
  background-position: bottom;
}

.title-artikel-category-page {
  font-size: 50px;
}

/* CATEGORY NAV */
.category-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.category-pill {
  padding: 6px 14px;
  border-radius: 10px;
  background: #eee;
  text-decoration: none;
  font-size: 14px;
  color: #333;
  transition: 0.3s;
}

.category-pill.active {
  background: #ffc107;
  font-weight: bold;
}

/* CARD */
.article-card {
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  transition: 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
}

/* IMAGE */
.article-img {
  position: relative;
}

.article-img img {
  width: 100%;
  display: block;
  border-radius: 10px;
}

/* BADGE */
.hero-category {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;

  padding: 6px 14px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* CATEGORY COLORS */
.cat-iot {
  background: linear-gradient(45deg, #00c6ff, #0072ff);
}

.cat-listrik {
  background: linear-gradient(45deg, #ffb300, #ffcc00);
  color: #000;
}

.cat-webdev {
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
}

.cat-default {
  background: #6c757d;
}

/* CONTENT */
.article-content {
  padding: 15px;
  color: white;
}

.article-content h5 {
  font-size: 16px;
  font-weight: bold;
}

.article-content p {
  font-size: 13px;
  opacity: 0.8;
}

/* META */
.article-meta {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0.7;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .artikel-category-heroes {
    height: 30vh;
  }

  .title-artikel-category-page {
    font-size: 25px;
  }
}

/* CATEGORY WRAPPER */
.category-wrap {
  display: flex;
  flex-wrap: wrap; /* 🔥 turun ke baris bawah */
  gap: 10px;
  justify-content: center; /* tengah desktop */
}

/* PILL STYLE */
.category-pill {
  padding: 8px 18px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.25s ease;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  backdrop-filter: blur(6px);
  /* border: 1px solid rgba(255, 255, 255, 0.15); */
}

/* Hover */
.category-pill:hover {
  background: rgba(255, 193, 7, 0.15);
  border: 1px solid rgba(255, 193, 7, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.35);
  color: #fff;
}

/* Active */
.category-pill.active {
  /* transform: translateY(-4px); */
  background: #fff;
  box-shadow: 0 0 28px rgba(255, 193, 7, 0.7);
  font-weight: 600;
  color: #000000;
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
</style>
