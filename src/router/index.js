import { createRouter, createWebHistory } from "vue-router";

import MainPageVue from "@/views/pages/main/MainPage.vue";
import ArtikelPageVue from "@/views/pages/artikel/ArtikelPage.vue";

const routes = [
  { path: "/", component: MainPageVue },
  { path: "/coding-and-iot", component: ArtikelPageVue },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
