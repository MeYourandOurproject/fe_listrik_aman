<template>
  <div>
    <!-- NAVBAR -->
    <div ref="navbarRef"
      :class="[
        'container-fluid fixed-top custom-navbar',
        navbarScrolled ? 'scrolled' : '',
      ]"
    >
      <div :class="['container-xxl', navbarScrolled ? 'py-2' : 'py-3']">
        <div class="row align-items-center">
          <!-- LOGO -->
          <div class="col-8 col-lg-2" v-if="!showSearchMobile">
            <router-link
              to="/"
              class="align-items-center justify-content-start d-flex justify-content-md-center"
            >
              <img
                src="../../assets/guru_ngulik_logo.png"
                alt="logo"
                class="logo-brand"
              />
            </router-link>
          </div>

          <!-- SEARCH MOBILE -->
          <div class="col-10 mobile-search d-lg-none" v-if="showSearchMobile">
            <div class="row align-items-center">
              <div class="col-10">
                <input
                  type="text"
                  class="form-control m-0"
                  placeholder="Cari artikel..."
                  v-model="searchQuery"
                  @keyup.enter="goToSearch"
                />
              </div>
              <div
                class="col-2 d-flex justify-content-center align-items-center"
              >
                <button class="search-btn-mobile border-0" @click="goToSearch">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 🔍 SEARCH ICON -->
          <div
            class="col-2 d-lg-none d-flex justify-content-start align-items-center"
          >
            <button class="btn-search-mobile" @click.stop="toggleSearch">
              <i
                class="bi"
                :class="showSearchMobile ? 'bi-x-lg' : 'bi-search'"
              ></i>
            </button>
          </div>

          <!-- ☰ HAMBURGER -->
          <div
            class="col-2 d-lg-none d-flex justify-content-end align-items-center"
            v-if="!showSearchMobile"
          >
            <button
              class="navbar-toggler"
              type="button"
              @click.stop="toggleMenu"
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
                  <router-link class="nav-link" to="/about">About</router-link>
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
                <button class="search-btn-dekstop border-0" @click="goToSearch">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE MENU -->
        <div v-if="showMenuMobile" class="mobile-menu d-lg-none">
          <ul class="navbar-nav text-center gap-1 fw-bold text-white">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/artikel">Artikel</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/project">Project</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/e-book">e-Book</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const selectedCategory = ref("");
const categories = ref([]);

const router = useRouter();
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;
const showSearchMobile = ref(false);
const showMenuMobile = ref(false);
const navbarRef = ref(null);



// HANDLE CLICK OUTSIDE
const handleClickOutside = (event) => {
  if (!navbarRef.value) return;

  if (!navbarRef.value.contains(event.target)) {
    showSearchMobile.value = false;
    showMenuMobile.value = false;
  }
};

const toggleSearch = () => {
  showSearchMobile.value = !showSearchMobile.value;
  showMenuMobile.value = false; // tutup menu
};

const toggleMenu = () => {
  showMenuMobile.value = !showMenuMobile.value;
  showSearchMobile.value = false;
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
  
  // 🔥 AUTO CLOSE
  showSearchMobile.value = false;
  showMenuMobile.value = false;
};

onMounted(() => {
  
  document.addEventListener("click", handleClickOutside);
  fetchCategories();
});

onUnmounted(() => {
  
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* NAVBAR */
.custom-navbar {
  background: rgba(0, 0, 0, 1);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
  border-bottom: 2px solid rgba(255, 193, 7, 0.4);
}

/* SCROLL EFFECT */
.custom-navbar.scrolled {
  background: rgba(0, 0, 0, 0.75);
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
.search-btn-dekstop {
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

.search-btn-mobile {
  background: linear-gradient(45deg, #ffb300, #ffcc00);
  border-radius: 10%;
  padding: 5px 10px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  transition: 0.3s;
}

.search-btn-dekstop:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
}

.search-btn-mobile:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.6);
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

/* SEARCH BUTTON MOBILE */
.btn-search-mobile {
  background: rgba(255, 193, 7, 0.15);
  border: none;
  color: #ffc107;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
}

.btn-search-mobile:hover {
  background: #ffc107;
  color: #000;
  transform: scale(1.1);
}

/* MOBILE SEARCH BAR */
.mobile-search {
  animation: fadeSlide 0.3s ease;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
