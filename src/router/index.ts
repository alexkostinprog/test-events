import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: () => import("@/pages/MainPage.vue"),
    },
    {
      path: "/current/:id",
      name: "CurrentEvent",
      component: () => import("@/pages/CurrentEventPage.vue"),
    },
  ],
})

export default router
