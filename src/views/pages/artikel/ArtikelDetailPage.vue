<template>
  <!-- HERO -->
  <section class="article-hero bg-warning py-md-5 pb-5">
    <div class="container-xxl hero-content pt-5 mt-5">
      <div class="row">
        <div class="col-8">
          <div class="hero-category">
            {{ article?.category?.name }}
          </div>

          <h1 class="hero-title">
            {{ article?.title }}
          </h1>

          <div class="hero-meta">
            <span>
              <i class="bi bi-person"></i>
              {{ article?.author?.name }}
            </span>

            <span>
              <i class="bi bi-calendar3"></i>
              {{ formateDate(article?.updatedAt) }}
            </span>

            <span>
              <i class="bi bi-eye"></i>
              {{ article?.views }} views
            </span>
          </div>
        </div>
        <div
          class="col-4 text-center d-flex align-items-center justify-content-center d-none d-md-block"
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
  <div class="container-xxl article-page p-4">
    <div
      class="row py-5"
      style="
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(6px);
        /* border: 1px solid rgba(255, 255, 255, 0.15); */
        border-radius: 18px;
      "
    >
      <!-- MAIN -->
      <div class="col-lg-8">
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
          <div v-html="article.content" class="article-content px-0"></div>
        </div>
      </div>

      <!-- SIDEBAR -->
      <div class="col-lg-4">
        <div class="sidebar text-start">
          <h5 class="sidebar-title">Artikel Lainnya</h5>

          <div
            v-for="(artikel, index) in filteredArticles.slice(0, 5)"
            :key="index"
            class="related-card"
          >
            <router-link :to="`/artikel/${artikel.slug}`" class="related-link">
              <img :src="fixImagePath(artikel.thumbnail)" class="related-img" />

              <div class="related-body">
                <div class="related-category">
                  {{ artikel.category?.name }}
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

.hero-content {
  color: white;
  /* max-width:900px; */
}

.hero-category {
  background: #41b83f;
  display: inline-block;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 15px;
}

.hero-title {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.3;
}

.hero-meta {
  margin-top: 15px;
  display: flex;
  gap: 20px;
  font-size: 14px;
  opacity: 0.9;
}

/* PAGE */

/* THUMBNAIL */

.article-thumbnail-wrapper {
  border-radius: 12px;
  overflow: hidden;
  /* margin-bottom: 30px; */
}

.article-thumbnail {
  width: 100%;
  height: 420px;
  object-fit: cover;
}

/* CONTENT */

.article-content {
  font-size: 17px;
  line-height: 1.9;
  /* color: #333; */
  text-align: justify;
}

.article-content h2 {
  margin-top: 40px;
}

.article-content img {
  width: 100%;
  border-radius: 8px;
  margin: 20px 0;
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
  color: #41b83f;
  font-weight: 700;
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
}
</style>
