<template>
  <!-- HERO -->
  <div
    class="container-fluid artikel-heroes d-flex align-items-end justify-content-center text-center pb-5"
  >
    <h1 class="title-artikel-page fw-bold text-white">
      Belajar Listrik, Website dan IoT
    </h1>
  </div>

  <!-- UTAMA -->
  <div class="my-5 ps-5 pe-5">
    <div class="row g-3">
      <!-- CAROUSEL (3 artikel terbaru) -->
      <div class="col-md-8">
        <div
          v-if="carouselArticles.length > 0"
          id="mainCarousel"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div
            class="carousel-inner rounded shadow carousel-fixed-height bg-warning"
          >
            <div
              class="carousel-item"
              v-for="(artikel, index) in carouselArticles"
              :key="artikel.slug"
              :class="{ active: index === 0 }"
            >
              <div class="position-relative w-100" style="height: 100%">
                <!-- Label "New" -->
                <span
                  class="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 z-1"
                >
                  Terbaru
                </span>

                <img
                  :src="artikel.thumbnail"
                  class="w-100"
                  style="object-fit: cover; height: 480px"
                />
                <div
                  class="position-absolute bottom-0 start-0 end-0 p-4 bg-dark bg-opacity-50 text-white"
                  style="backdrop-filter: blur(4px)"
                >
                  <h4 class="mb-2">{{ artikel.title }}</h4>
                  <p class="penulis mb-2">
                    {{ artikel.author }} - {{ formatDate(artikel.updatedAt) }}
                  </p>
                  <!-- <div
                    v-html="
                      artikel.content.split(' ').slice(0, 25).join(' ') + '...'
                    "
                    class="isi my-3"
                  ></div> -->
                  <router-link
                    :to="`/artikel/${artikel.slug}`"
                    class="text-decoration-none mt-auto"
                  >
                    <button
                      type="button"
                      class="btn btn-sm btn-primary justify-content-end fst-italic"
                    >
                      Selengkapnya<i
                        class="bi bi-arrow-right-circle-fill ms-2"
                      ></i>
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Tombol Navigasi Carousel -->
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#mainCarousel"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <!-- 2 Artikel di Samping -->
      <div class="col-md-4 d-flex flex-column gap-3">
        <div
          v-for="artikel in sideArticles"
          :key="artikel.slug"
          class="position-relative overflow-hidden rounded shadow-sm side-card-equal-height"
        >
          <img
            :src="artikel.thumbnail"
            class="w-100 h-100"
            style="object-fit: cover"
          />
          <div
            class="position-absolute bottom-0 start-0 end-0 p-2 bg-dark bg-opacity-50 text-white"
            style="backdrop-filter: blur(4px)"
          >
            <h6 class="mb-1">{{ artikel.title }}</h6>
            <p class="penulis mb-2">
              {{ artikel.author }} - {{ formatDate(artikel.updatedAt) }}
            </p>
            <router-link
              :to="`/artikel/${artikel.slug}`"
              class="text-decoration-none"
            >
              <button
                type="button"
                class="btn btn-primary btn-sm justify-content-end fst-italic"
              >
                Selengkapnya<i class="bi bi-arrow-right-circle-fill ms-2"></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Artikel Lainnya -->
    <div class="row row-cols-1 row-cols-md-3 g-3 mt-4">
      <div v-for="artikel in otherArticles" :key="artikel.slug" class="col">
        <div
          class="position-relative overflow-hidden rounded shadow-sm"
          style="height: 260px"
        >
          <img
            :src="artikel.thumbnail"
            class="w-100 h-100"
            style="object-fit: cover"
          />
          <div
            class="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-50 text-white d-flex flex-column justify-content-end"
            style="backdrop-filter: blur(4px)"
          >
            <h6 class="mb-1">{{ artikel.title }}</h6>
            <p class="penulis mb-2">
              {{ artikel.author }} - {{ formatDate(artikel.updatedAt) }}
            </p>
            <router-link
              :to="`/artikel/${artikel.slug}`"
              class="text-decoration-none"
            >
              <button
                type="button"
                class="btn btn-primary btn-sm justify-content-end fst-italic"
              >
                Selengkapnya<i class="bi bi-arrow-right-circle-fill ms-2"></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";

export default {
  setup() {
    const articles = ref([]);

    const API_BASE_URL= process.env.VUE_APP_API_BASE_URL;

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/artikels`);

        if (!response.ok) throw new Error("Failed to fetch data");

        let data = await response.json();
        data = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        articles.value = data;
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        month: "short",
        year: "numeric",
      })
        .format(date)
        .replace(".", "");
    };

    const carouselArticles = computed(() => articles.value.slice(0, 3));
    const sideArticles = computed(() => articles.value.slice(3, 5));
    const otherArticles = computed(() => articles.value.slice(5));

    onMounted(() => {
      fetchData();
    });

    return {
      articles,
      carouselArticles,
      sideArticles,
      otherArticles,
      formatDate,
    };
  },
};
</script>

<style>
.artikel-heroes {
  min-height: 40vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
    url("../../../assets/hero-img.jpg");
  background-size: cover;
  display: flex;
}

.title-artikel-page {
  letter-spacing: 0px;
  margin: 0px;
  font-size: 50px;
  font-weight: bold;
  max-height: 3em;
}

.penulis {
  font-size: 12px; /* Increase font size */
  font-weight: lighter;
}

.isi {
  font-size: 16px; /* Increase font size */
  font-weight: lighter;
  text-align: justify;
  flex-grow: 1;
}

.carousel-fixed-height {
  height: 480px;
}

.side-card-equal-height {
  height: 232px;
}

@media (max-width: 767px) {
  .title-artikel-page {
    font-size: 40px;
  }
}
</style>
