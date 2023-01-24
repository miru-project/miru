import { createRouter, createWebHistory } from "vue-router";
import LoveView from "../views/LoveView.vue";
import SearchView from "../views/SearchView.vue";
import ExtensionView from "../views/ExtensionView.vue";
import SettingsView from "../views/SettingsView.vue";
import WatchViewVue from "@/views/WatchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LoveView,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/extension",
      name: "extension",
      component: ExtensionView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
    {
      path: "/watch",
      name: "watch",
      component: WatchViewVue,
    },
  ],
});

export default router;
