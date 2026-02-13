<template>
  <div class="admin-sidebar">
    <div
      class="d-flex flex-column main p-3 text-bg-light text-center"
      style="width: 280px"
    >
      <!-- LOGO -->
      <router-link to="/" class="link-body-emphasis text-decoration-none">
        <img
          alt="Logo"
          height="60px"
          class="d-inline-block align-text-center me-2"
          src="../../assets/logobrand.png"
        />
      </router-link>

      <hr />

      <!-- MENU -->
      <ul class="nav nav-pills flex-column mb-auto text-start fw-bold">

        <!-- DASHBOARD -->
        <li>
          <router-link
            to="/admin/dashboard"
            class="nav-link text-dark"
            :class="{ active: $route.name === 'DashboardAdmin' }"
          >
            <i class="bi bi-speedometer2 pe-none me-2"></i>
            Dashboard
          </router-link>
        </li>

        <!-- CATEGORY -->
        <li>
          <router-link
            to="/admin/category"
            class="nav-link text-dark"
            :class="{ active: $route.name === 'CategoryAdmin' }"
          >
            <i class="bi bi-tags pe-none me-2"></i>
            Category
          </router-link>
        </li>

        <!-- ARTIKEL -->
        <li>
          <router-link
            to="/admin/artikel"
            class="nav-link text-dark"
            :class="{ active: $route.name === 'ArtikelAdmin' }"
          >
            <i class="bi bi-file-earmark-text pe-none me-2"></i>
            Artikel
          </router-link>
        </li>

        <!-- EBOOK -->
        <li>
          <router-link
            to="/admin/ebook"
            class="nav-link text-dark"
            :class="{ active: $route.name === 'EbookAdmin' }"
          >
            <i class="bi bi-book pe-none me-2"></i>
            Ebook
          </router-link>
        </li>

        <!-- VIDEO -->
        <li>
          <router-link
            to="/admin/video"
            class="nav-link text-dark"
            :class="{ active: $route.name === 'VideoAdmin' }"
          >
            <i class="bi bi-camera-video pe-none me-2"></i>
            Video
          </router-link>
        </li>

        <!-- PRODUK -->
        <li>
          <router-link
            to="/admin/produk"
            class="nav-link text-dark"
            :class="{ active: $route.name === 'ProdukAdmin' }"
          >
            <i class="bi bi-box-seam pe-none me-2"></i>
            Produk
          </router-link>
        </li>

      </ul>

      <hr />

      <!-- PROFILE -->
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>Admin</strong>
        </a>
        <ul class="dropdown-menu text-small shadow">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style>
.main {
  min-height: 100vh;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.admin-sidebar {
  min-width: 280px;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
}
</style>
