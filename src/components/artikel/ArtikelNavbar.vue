<template>
  <div>
    <!-- NAVBAR -->
    <div
      :class="[
        'container-fluid fixed-top custom-navbar',
        navbarScrolled ? 'scrolled' : ''
      ]"
    >
      <div :class="['container-xxl', navbarScrolled ? 'py-2' : 'py-3']">
        <div class="row align-items-center">
          <!-- LOGO -->
          <div class="col-4 col-lg-2">
            <router-link
              to="/"
              class="align-items-center justify-content-center d-flex"
            >
              <img
                src="../../assets/guru_ngulik_logo.png"
                alt="logo"
                class="logo-brand"
              />
            </router-link>
          </div>

          <!-- HAMBURGER MOBILE -->
          <div class="col-8 d-lg-none text-end">
            <button
              class="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <i class="bi bi-list fs-1 text-warning humberger-icon"></i>
            </button>
          </div>

          <!-- MENU DESKTOP -->
          <div class="col-5 d-none d-lg-block">
            <div id="navbarNav">
              <ul
                class="nav text-center justify-content-center align-items-center gap-1 fw-bold d-flex"
              >
                <li class="nav-item">
                  <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/artikel"
                    >Artikel</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/project"
                    >Project</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/e-book"
                    >e-Book</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/about"
                    >About</router-link
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- SEARCH + FILTER -->
          <div class="col-5 d-none d-lg-block">
            <div class="row justify-content-end g-2 align-items-center">
              <!-- SEARCH INPUT -->
              <div class="col-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cari artikel..."
                  v-model="searchQuery"
                  @keyup.enter="goToSearch"
                />
              </div>

              <!-- CATEGORY -->
              <div class="col-4">
                <select class="form-select" v-model="selectedCategory">
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

              <!-- BUTTON -->
              <div class="col-auto">
                <button class="search-btn border-0" @click="goToSearch">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE MENU -->
        <div class="collapse d-lg-none" id="navbarNav">
          <ul class="navbar-nav text-center gap-1 fw-bold text-white">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/artikel"
                >Artikel</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/project"
                >Project</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/e-book"
                >e-Book</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about"
                >About</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- BACK TO TOP -->
    <i
      v-if="showBackToTop"
      @click="scrollToTop"
      class="bi bi-chevron-compact-up back-to-top"
    ></i>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const navbarScrolled = ref(false);
const showBackToTop = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("");
const categories = ref([]);

const router = useRouter();
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

// SCROLL
const handleScroll = () => {
  navbarScrolled.value = window.scrollY > 50;
  showBackToTop.value = window.scrollY > 500;
};

// BACK TO TOP
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// FETCH CATEGORY
const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories`);
    categories.value = await res.json();
  } catch (err) {
    console.error("Gagal fetch kategori:", err);
  }
};

// SEARCH
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchCategories();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* NAVBAR */
.custom-navbar {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border-bottom: 2px solid rgba(255, 193, 7, 0.4);
}

/* SCROLL EFFECT */
.custom-navbar.scrolled {
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 2px solid rgba(255, 193, 7, 0.8);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.2);
}

/* LOGO */
.logo-brand {
  height: 50px;
  transition: 0.3s ease;
}

/* MENU */
.nav-link {
  color: #ffffff !important;
  font-weight: 600;
  position: relative;
}

.nav-link:hover {
  color: #ffc107 !important;
}

/* UNDERLINE GLOW */
.nav-link::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  left: 0;
  bottom: -4px;
  background: linear-gradient(90deg, #ffb300, #ffcc00);
  transition: 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

/* SEARCH BUTTON */
.search-btn {
  background: linear-gradient(45deg, #ffb300, #ffcc00);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  transition: 0.3s;
}

.search-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
}

/* BACK TO TOP */
.back-to-top {
  position: fixed;
  bottom: 20px;
  right: 50%;
  z-index: 1000;
  font-size: 40px;
  color: #ffc107;
  cursor: pointer;
  animation: bounce 1.5s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .logo-brand {
    height: 45px;
  }
}
</style>