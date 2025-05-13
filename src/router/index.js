import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "@/views/layouts/main/MainLayout.vue";
import ArtikelLayout from "@/views/layouts/artikel/ArtikelLayout.vue";

import MainPage from "@/views/pages/main/MainPage.vue";
import ArtikelPage from "@/views/pages/artikel/ArtikelPage.vue";
import ArtikelDetailPage from "@/views/pages/artikel/ArtikelDetailPage.vue";

import LoginPage from "@/views/pages/admin/LoginPage.vue";

import AdminLayout from "@/views/layouts/admin/AdminLayout.vue";
import DashboardAdmin from "@/views/pages/admin/DashboardAdmin.vue";
import ArtikelAdmin from "@/views/pages/admin/artikel-admin/ArtikelAdmin.vue";
import CreateArtikel from "@/views/pages/admin/artikel-admin/CreateArtikel.vue";
import EditArtikel from "@/views/pages/admin/artikel-admin/EditArtikel.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: MainPage,
        meta: { title: "Home" },
      },
    ],
  },
  {
    path: "/coding-and-iot",
    component: ArtikelLayout,
    children: [
      {
        path: "",
        name: "Artikel",
        component: ArtikelPage,
        meta: { title: "Artikel" },
      },
      {
        path: ":slug",
        name: "ArtikelDetail",
        component: ArtikelDetailPage,
        meta: { title: "ArtikelDetail" },
      },
    ],
  },
  { path: "/admin-login", name: LoginPage, component: LoginPage },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "dashboard",
        name: "DashboardAdmin",
        component: DashboardAdmin,
        meta: { title: "DASHBOARD", requiresAuth: true },
      },
      {
        path: "artikel",
        name: "ArtikelAdmin",
        component: ArtikelAdmin,
        meta: { title: "ARTIKEL ADMIN", requiresAuth: true },
      },
      {
        path: "artikel/create",
        name: "CreateArtikel",
        component: CreateArtikel,
        meta: { title: "CREATE ARTIKEL", requiresAuth: true },
      },
      {
        path: "artikel/edit/:slug",
        name: "EditArtikel",
        component: EditArtikel,
        meta: { title: "EDIT ARTIKEL", requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
