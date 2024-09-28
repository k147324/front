import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "../views/Main.vue";
import Login from "../views/login/index.vue";
import Record from "../views/record/index.vue";
import Detect from "../views/detect/index.vue";
import Home from "../views/home/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/main",
    component: Layout,
    children: [
      {
        path: "home",
        meta: {
          id: "1",
          name: "首頁",
          pathL: "/home",
        },
        component: Home,
      },

      {
        path: "record",
        meta: {
          id: "2",
          name: "紀錄",
          path: "/record",
        },
        component: Record,
      },
      {
        path: "Detect",
        meta: {
          id: "3",
          name: "偵測",
          path: "/detect",
        },
        component: Detect,
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
export default router;
