<template>
  <div class="container-fluid fixed-top custom-navbar">
    <div :class="['container-xxl', navbarScrolled ? 'py-2' : 'py-3']">
      <div class="row align-items-center">
        <!-- Logo Brand -->
        <div class="col-4 col-lg-2">
          <a class="align-items-center justify-content-center d-flex" href="/">
            <img
              src="../../assets/guru_ngulik_logo.png"
              alt=""
              class="logo-brand"
            />
          </a>
        </div>

        <!-- Tombol Hamburger untuk Mobile -->
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

        <!-- Menu untuk Desktop (Horizontal) -->
        <div class="col-5 d-none d-lg-block">
          <div class="justify-content-between" id="navbarNav">
            <ul
              class="nav text-center justify-content-center align-items-center gap-1 fw-bold d-flex"
            >
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/artikel">Artikel</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/project">Project</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/e-book">e-Book</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-5 d-none d-lg-block">
          <div class="row justify-content-end g-2 align-items-center">
            <!-- Input search -->
            <div class="col-6 col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Cari artikel..."
                v-model="searchQuery"
                @keyup.enter="goToSearch"
              />
            </div>

            <!-- Filter kategori -->
            <div class="col-4 col-md-4">
              <select class="form-select" v-model="selectedCategory">
                <option value="">Semua kategori</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>

            <!-- Search Button -->
            <div class="col-auto">
              <button class="search-btn border-0" @click="goToSearch">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Hamburger untuk Mobile (Vertical) -->
      <div class="collapse d-lg-none" id="navbarNav">
        <ul class="navbar-nav text-center gap-1 fw-bold text-white">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/artikel">Artikel</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/project">Project</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/e-book">e-Book</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Tombol Back to Top -->
  <i
    v-if="showBackToTop"
    @click="scrollToTop"
    class="bi bi-chevron-compact-up back-to-top"
  ></i>

  
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const navbarScrolled = ref(false);
const showBackToTop = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("");
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
const categories = ref([]);

const router = useRouter();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const fetchCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/api/categories`);
  categories.value = await res.json();
};

const handleScroll = () => {
  navbarScrolled.value = window.scrollY > 50;
  showBackToTop.value = window.scrollY > 500;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchCategories();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const goToSearch = () => {
  if (!searchQuery.value && !selectedCategory.value) return;

  router.push({
    path: "/artikel/search",
    query: {
      search: searchQuery.value || undefined,
      category_id: selectedCategory.value || undefined,
    },
  });

  return {
    fetchCategories,
  };
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.custom-navbar {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  /* padding: 18px 0; */
  transition: all 0.4s ease;
  border-bottom: 2px solid rgba(255, 193, 7, 0.4);
}

.container {
  transition: margin 0.5s ease-in-out;
}

.logo-brand {
  height: 50px;
  transition: 0.3s ease;
}

/* =========================
   MENU
========================= */
.nav-link {
  color: #ffffff !important;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #ffc107 !important;
}

/* Underline Glow Effect */
.nav-link::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  left: 0;
  bottom: -4px;
  background: linear-gradient(90deg, #ffb300, #ffcc00);
  transition: 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Underline Glow Effect */
.nav-link::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  left: 0;
  bottom: -4px;
  background: linear-gradient(90deg, #ffb300, #ffcc00);
  transition: 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Transisi Halus */
.bg-warning,
.bg-white,
.nav-link,
.logo-brand {
  transition: all 0.5s ease-in-out;
}

/* Tombol Back to Top */
.back-to-top {
  position: fixed;
  bottom: 10px;
  right: 50%;
  z-index: 1000;
  font-size: 40px;
  color: #f49655;
  cursor: pointer;
  transition: color 0.3s ease-in-out, transform 0.3s ease-in-out;
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

.back-to-top:hover {
  color: #f49655;
  transform: scale(2);
}

.humberger-icon {
  display: inline-block;
  transition: transform 0.3s ease-in-out;
}

.humberger-icon:hover {
  transform: scale(1.2);
}

@media (max-width: 767px) {
  .logo-brand {
    height: 50px;
    transition: filter 0.5s ease-in-out;
  }
}

/* =========================
   SOSMED HOVER EFFECT
========================= */
.nav-item i {
  transition: all 0.3s ease;
}

.nav-item:hover i {
  transform: scale(1.18);
  color: #ffc107 !important; /* jadi kuning saat hover */
  filter: drop-shadow(0 0 6px rgba(255, 193, 7, 0.6));
}

.nav-item small {
  transition: all 0.3s ease;
}

.nav-item:hover small {
  color: #ffc107;
}

/* =========================
   SEARCH FORM
========================= */
.search-form {
  /* background: rgba(255, 255, 255, 0.08); */
  padding: 6px;
  border-radius: 50px;
  backdrop-filter: blur(6px);
  /* border: 1px solid rgba(255, 193, 7, 0.2); */
}

.search-input {
  background: transparent;
  border: none;
  color: white;
  width: 220px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  box-shadow: none;
  background: transparent;
  color: white;
}

.search-btn {
  background: linear-gradient(45deg, #ffb300, #ffcc00);
  border: none;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffc107;
  transition: 0.3s;
}

.search-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
}


</style>
