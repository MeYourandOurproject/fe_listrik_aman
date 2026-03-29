<template>
  <!-- HERO -->
  <div
    class="container-fluid artikel-home-heroes d-flex align-items-end justify-content-center text-center py-4"
  >
    <div class="container-xxl">
      <h1 class="title-artikel-home-page fw-bold text-white mb-md-5 mb-3">
        Learn Electrical and IoT for <br />Smart Home Applications
      </h1>
    </div>
  </div>

  <!-- MAIN -->
  <div class="container-xxl p-4 py-4 pb-5">
    <!-- CATEGORY NAV -->
    <div class="row mb-3">
      <div class="col-12">
        <div class="category-wrap mt-3">
          <router-link
            to="/artikel"
            class="category-pill"
            :class="{ active: $route.path === '/artikel' }"
            >All Article</router-link
          >
          <router-link
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/artikel/kategori/${cat.slug}`"
            class="category-pill"
          >
            {{ cat.name }}
          </router-link>
        </div>
      </div>
    </div>

    <!-- 🔥 TOP SECTION -->
    <div class="row mb-4 align-items-stretch pt-3 g-4">
      <!-- CAROUSEL -->
      <div class="col-md-8 mb-3 py-2">
        <div
          id="carouselArtikel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner rounded overflow-hidden">
            <div
              v-for="(artikel, index) in popularArticles"
              :key="artikel.id"
              class="carousel-item"
              :class="{ active: index === 0 }"
            >
              <router-link
                :to="`/artikel/${artikel.slug}`"
                class="text-decoration-none"
              >
                <div class="article-card carousel-card">
                  <div class="article-img">
                    <img :src="artikel.thumbnail" />

                    <div
                      :class="[
                        'hero-category',
                        getCategoryClass(artikel.Category_Artikel?.name),
                      ]"
                    >
                      {{ artikel.Category_Artikel?.name }}
                    </div>
                  </div>

                  <div class="article-content">
                    <h3>{{ artikel.title }}</h3>
                    <p>{{ artikel.excerpt }}</p>

                    <!-- 🔥 TAMBAH VIEWS -->
                    <div class="article-meta">
                      <span><i class="bi bi-eye"></i> {{ artikel.views }}</span>
                      <span>{{ formatDate(artikel.updatedAt) }}</span>
                    </div>
                  </div>
                </div></router-link
              >
            </div>
          </div>

          <!-- BUTTON -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselArtikel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon"></span>
          </button>

          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselArtikel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      <!-- 🔥 LATEST POSTS -->
      <div class="col-md-4 d-flex flex-column gap-3 h-100">
        <h2>Latest Posts</h2>
        <div
          v-for="artikel in latestArticles"
          :key="artikel.id"
          class="article-card-latest"
          style="height: 110px"
        >
          <router-link
            :to="`/artikel/${artikel.slug}`"
            class="text-decoration-none h-100"
          >
            <div class="d-flex h-100">
              <img
                :src="artikel.thumbnail"
                style="width: 120px; object-fit: cover; margin-right: 10px;"
              />

              <div class="p-2 text-white">
                <small class="text-warning">
                  {{ artikel.Category_Artikel?.name }}
                </small>
                <h6 class="mb-1">{{ artikel.title }}</h6>
              </div>
            </div></router-link
          >
        </div>
      </div>
    </div>

    <!-- 🔥 OTHER ARTICLES -->
    <div class="row pt-3 g-4">
      <h2>Others Articles</h2>
      <div class="col-md-4" v-for="artikel in otherArticles" :key="artikel.id">
        <router-link
          :to="`/artikel/${artikel.slug}`"
          class="text-decoration-none"
        >
          <div class="article-card">
            <div class="article-img">
              <img :src="artikel.thumbnail" />

              <div
                :class="[
                  'hero-category',
                  getCategoryClass(artikel.Category_Artikel?.name),
                ]"
              >
                {{ artikel.Category_Artikel?.name }}
              </div>
            </div>

            <div class="article-content">
              <h5>{{ artikel.title }}</h5>
              <p>{{ artikel.excerpt }}</p>

              <div class="article-meta">
                <span><i class="bi bi-eye"></i> {{ artikel.views }}</span>
                <span>{{ formatDate(artikel.updatedAt) }}</span>
              </div>
            </div>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";

export default {
  setup() {
    const articles = ref([]);
    const categories = ref([]);
    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    const fetchArticles = async () => {
      const res = await fetch(`${API_BASE_URL}/api/artikels`);
      const result = await res.json();
      articles.value = result.data;
    };

    const fetchCategories = async () => {
      const res = await fetch(`${API_BASE_URL}/api/categories`);
      categories.value = await res.json();
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID");
    };

    const getCategoryClass = (name) => {
      if (!name) return "cat-default";

      const map = {
        "internet of thing (iot)": "cat-iot",
        "electrical": "cat-listrik",
        "web development": "cat-webdev",
      };

      return map[name.toLowerCase()] || "cat-default";
    };

    // 🔥 SPLIT DATA
    const popularArticles = computed(() => articles.value.slice(0, 3));
    const latestArticles = computed(() => articles.value.slice(3, 6));
    const otherArticles = computed(() => articles.value.slice(6));

    onMounted(() => {
      fetchArticles();
      fetchCategories();
    });

    return {
      categories,
      popularArticles,
      latestArticles,
      otherArticles,
      formatDate,
      getCategoryClass,
    };
  },
};
</script>

<style>
/* HERO */
.artikel-home-heroes {
  height: 320px;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)),
    url("../../../assets/img_hero_all.PNG");
  background-size: cover;
}

/* CATEGORY */
.category-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

/* 🔥 FIX HEIGHT CAROUSEL */
.carousel-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 🔥 IMAGE FLEX BIAR PROPORSIONAL */
.carousel-card .article-img {
  height: 282px; /* 👉 INI BISA KAMU ATUR */
  overflow: hidden;
}

.carousel-card .article-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 🔥 CONTENT FLEX */
.carousel-card .article-content {
  flex: 1;
}

/* 🔥 SAMAKAN TINGGI DENGAN LATEST */
#carouselArtikel {
  height: 100%;
}

.carousel-inner {
  height: 100%;
}

.carousel-item {
  height: 100%;
}

/* CARD */
.article-card-latest {
  /* background: #111; */
  /* border-radius: 5px; */
  overflow: hidden;
  position: relative;
  transition: 0.3s;
}

.article-card-latest:hover {
  transform: translateY(-5px);
}

.article-card-latest img{
  border-radius: 5px;
}

/* IMAGE */
.article-img img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* BADGE */
.hero-category {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 6px 12px;
  border-radius: 5px;
  color: white;
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

/* META */
.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  opacity: 0.7;
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
  transition: 0.3s;

  z-index: 100; /* 🔥 naikkan */
  text-decoration: none;
  color: #fff;
  font-weight: bold;

  pointer-events: auto; /* 🔥 WAJIB */
}

.article-content,
.article-img,
.hero-category {
  position: relative;
  z-index: 1;
}

.article-card:hover .artikel-overlay {
  opacity: 1;
}

/* 🔥 HOVER */
.article-card:hover .artikel-overlay {
  opacity: 1;
}

.artikel-overlay {
  cursor: pointer;
}

/* 🔥 MOBILE AUTO MUNCUL */
@media (max-width: 768px) {
  .artikel-overlay {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .artikel-home-heroes {
    height: 30vh;
  }

  .title-artikel-home-page {
    font-size: 25px;
  }
}
</style>
