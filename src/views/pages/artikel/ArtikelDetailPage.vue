<template>
  <!-- HERO -->
  <section class="article-hero bg-warning py-md-5 pb-5">
    <div class="container-xxl hero-content pt-5 mt-5">
      <div class="row">
        <div class="col-12 col-md-8 p-4">
          <!-- <div :class="['hero-category', categoryClass]">
            {{ article?.Category_Artikel?.name }}
          </div> -->

          <span :class="['hero-category-details my-3', categoryClass]">{{
            article?.Category_Artikel?.name
          }}</span>
          <h1 class="hero-title ">
            {{ article?.title }}
          </h1>

          <div class="hero-meta fw-bold d-flex gap-4">
            <span>
              <i class="bi bi-person me-2"></i>
              {{ article?.author }}
            </span>

            <span>
              <i class="bi bi-calendar3 me-2"></i>
              {{ formateDate(article?.updatedAt) }}
            </span>

            <span>
              <i class="bi bi-eye me-2"></i>
              {{ article?.views }} views
            </span>
          </div>
        </div>
        <div
          class="col-4 text-center align-items-center justify-content-center d-none d-md-flex"
        >
          <img
            src="../../../assets/guru_ngulik.png"
            alt=""
            style="height: 200px"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- CONTENT -->
  <div class="container-xxl article-page py-5 px-3">
    <div
      class="row px-1 g-4 p-2"
      style="
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(6px);
        /* border: 1px solid rgba(255, 255, 255, 0.15); */
        border-radius: 18px;
      "
    >
      <!-- EBOOK -->
      <div class="col-12 col-md-2 order-3 order-lg-1 mt-md-0 mt-3">
        <div class="sidebar">
          <h5
            class="sidebar-title text-start border-bottom border-warning border-1 pb-2"
          >
            Ebook Pilihan
          </h5>
          <a href="#" class="link-hover">
            <div
              class="row d-flex align-items-start justify-content-center g-0 g-md-3 article-card-latest"
            >
              <div
                class="col-4 d-flex align-items-center justify-content-center"
              >
                <img
                  src="../../../assets/ebook.png"
                  alt=""
                  style="height: 100px; width: auto"
                />
              </div>
              <div class="col-8">
                <small class="related-category text-warning"
                  >Internet Of Things (IoT)</small
                >
                <br />
                <small class="title-ebook-detail-page"
                  >Panduan Lengkap IoT untuk Pemula</small
                >
              </div>
            </div></a
          >

          <a href="#" class="link-hover">
            <div
              class="row d-flex align-items-start justify-content-center g-0 g-md-3 article-card-latest"
            >
              <div
                class="col-4 d-flex align-items-center justify-content-center"
              >
                <img
                  src="../../../assets/ebook.png"
                  alt=""
                  style="height: 100px; width: auto"
                />
              </div>
              <div class="col-8">
                <small class="related-category text-warning"
                  >Internet Of Things (IoT)</small
                >
                <br />
                <small class="title-ebook-detail-page"
                  >Panduan Lengkap IoT untuk Pemula</small
                >
              </div>
            </div></a
          >
        </div>
      </div>

      <!-- CONTENT -->
      <div class="col-12 col-md-7 order-1 order-lg-2">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-grow text-warning"></div>
          <div class="spinner-grow text-dark"></div>
          <div class="spinner-grow text-warning"></div>
          <div class="spinner-grow text-dark"></div>
          <p class="mt-3">Memuat Artikel...</p>
        </div>

        <div v-else-if="article">
          <!-- THUMBNAIL -->
          <div class="article-thumbnail-wrapper">
            <img
              :src="fixImagePath(article.thumbnail)"
              class="article-thumbnail"
            />
          </div>

          <!-- CONTENT -->
          <div
            v-html="article.content"
            class="article-content-detail px-0"
          ></div>
        </div>
      </div>

      <!-- SIDEBAR -->
      <div class="col-12 col-md-3 order-2 order-lg-2 mb-4 mb-lg-0 mt-md-0 mt-3">
        <div class="sidebar text-start">
          <h5 class="sidebar-title border-bottom border-warning border-1 pb-2">
            Artikel Lainnya
          </h5>

          <div
            v-for="(artikel, index) in filteredArticles.slice(0, 5)"
            :key="index"
            class="related-card"
          >
            <router-link
              :to="`/artikel/${artikel.slug}`"
              class="related-link article-card-latest"
            >
              <img :src="fixImagePath(artikel.thumbnail)" class="related-img" />

              <div class="related-body">
                <div class="related-category text-warning">
                  {{ artikel.Category_Artikel.name }}
                </div>

                <div class="related-title">
                  {{ artikel.title }}
                </div>

                <div class="related-date">
                  {{ formateDate(artikel.updatedAt) }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
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

    const article = ref(null);
    const articles = ref([]);
    const categories = ref([]);
    const loading = ref(false);

    const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

    // ========================
    // FIX PATH WINDOWS "\"
    // ========================
    const fixImagePath = (path) => {
      if (!path) return "";
      return path.replace(/\\/g, "/");
    };

    // ========================
    // FORMAT DATE
    // ========================
    const formateDate = (dataString) => {
      const date = new Date(dataString);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    };

    // ========================
    // FETCH ALL ARTICLES
    // ========================
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/artikels`);
        const result = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 1200));
        articles.value = result.data;
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    // ========================
    // FETCH DETAIL
    // ========================
    const fetchData = async (slug) => {
      loading.value = true;
      article.value = null;

      try {
        const response = await fetch(`${API_BASE_URL}/api/artikels/${slug}`);
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, 500));
        article.value = data;
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        loading.value = false;
      }
    };

    // ========================
    // FILTER RELATED (tidak tampilkan yg sedang dibuka)
    // ========================
    const filteredArticles = computed(() => {
      if (!article.value) return articles.value;
      return articles.value.filter((a) => a.slug !== article.value.slug);
    });

    const categoryClass = computed(() => {
      const name = article.value?.Category_Artikel?.name?.toLowerCase();

      const map = {
        "internet of thing (iot)": "cat-iot",
        electrical: "cat-listrik",
        "web development": "cat-webdev",
      };

      return map[name] || "cat-default";
    });

    // ========================
    // WATCH ROUTE
    // ========================
    watch(
      () => route.params.slug,
      (newSlug) => {
        fetchData(newSlug);
      },
    );

    onMounted(() => {
      fetchData(route.params.slug);
      fetchArticles();
    });

    return {
      article,
      articles,
      categories,
      loading,
      formateDate,
      fixImagePath,
      filteredArticles,
      categoryClass,
    };
  },
};
</script>

<style>
/* HERO */

.article-hero {
  background: url("../../../assets/hero-img.webp") center/cover;
  position: relative;
  /* padding-top: 120px; */
  text-align: left;
}

/* 🔥 TAMBAHAN: overlay biar teks kebaca */
.article-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

/* biar konten di atas overlay */
.hero-content {
  position: relative;
  z-index: 2;
  color: white;
}

/* CATEGORY */
.hero-category-details {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  /* margin-bottom: 15px; */
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

/* TITLE */
.hero-title {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.3;
}

/* META */
.hero-meta {
  margin-top: 15px;
  font-size: 14px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-title {
    font-size: 28px;
  }
}

.article-thumbnail-wrapper {
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 30px;
}

.article-thumbnail {
  width: 100%;
  /* height: 420px; */
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.5);
}

/* CONTENT */

.article-content-detail {
  font-size: 16px;
  line-height: 2;
  color: #ffffff;
  /* border-bottom: #ffffff 2px solid; */
  margin-bottom: 20px;
}

/* PARAGRAF */
.article-content-detail p {
  font-size: 1.2rem;
  /* margin-bottom: 16px; */
}

/* HEADING */
.article-content-detail h1 {
  font-size: 32px;
  font-weight: 700;
  /* margin-top: 30px; */
}

.article-content-detail h2 {
  font-size: 1.2rem;
  font-weight: 700;
  /* margin-top: 25px;
  margin-bottom: 10px; */
  text-align: left;
}

.article-content-detail h3 {
  font-size: 22px;
  font-weight: 600;
  /* margin-top: 20px; */
}

/* LIST */
.article-content-detail ul {
  padding-left: 20px;
  /* margin-bottom: 16px; */
}

.article-content-detail li {
  margin-bottom: 2px;
}

/* IMAGE */
.article-content-detail img {
  max-width: 100%;
  border-radius: 10px;
  margin: 20px 0;
}

/* OPTIONAL: biar enak dibaca */
.article-content-detail p,
.article-content-detail li {
  text-align: justify;
  font-size: 1.1rem;
}

/* SIDEBAR */

.sidebar {
  position: sticky;
  top: 100px;
}

.sidebar-title {
  font-weight: 700;
  margin-bottom: 20px;
}

/* RELATED */

.related-card {
  margin-bottom: 18px;
}

.related-link {
  display: flex;
  gap: 12px;
  text-decoration: none;
}

.related-img {
  width: 90px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.related-title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.related-date {
  font-size: 12px;
  color: #777;
}

.related-category {
  font-size: 11px;
  font-weight: 700;
}

.link-hover {
  text-decoration: none;
  color: #fff;
  display: inline-block;
  transition: all 0.3s ease;
}

.link-hover small {
  margin: 0;
  transition: all 0.3s ease;
}

.link-hover:hover small {
  color: #ffc107;
  transform: translateX(5px);
  text-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
}

.title-ebook-detail-page {
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .article-hero {
    background: url("../../../assets/hero-img.webp") center/cover;
    position: relative;
    /* padding-top: 120px; */
    text-align: start;
    min-height: 300px;
  }

  .hero-title {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.3;
    text-align: start;
  }

  .title-ebook-detail-page {
    font-size: 1rem;
  }

  .article-content-detail p,
  .article-content-detail li {
    text-align: justify;
    font-size: 1rem;
  }
}
</style>
