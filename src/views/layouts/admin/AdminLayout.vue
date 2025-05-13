<template>
  <div class="admin-layout">
    <AdminSidebar />
    <div class="main-content">
      <AdminNavbar />
      <router-view />
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
}

.main-content {
  flex-grow: 1;
  /* padding: 20px; */
}
</style>
