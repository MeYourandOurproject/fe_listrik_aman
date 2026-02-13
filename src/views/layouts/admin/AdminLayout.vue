<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="main-content">
      <AdminNavbar />
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";

export default {
  name: "AdminLayout",
  components: {
    AdminSidebar,
    AdminNavbar,
  },
};
</script>

<style>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  min-width: 0; /* 🔥 penting supaya tidak dorong sidebar */
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 20px;
  overflow-x: hidden;
}
</style>
