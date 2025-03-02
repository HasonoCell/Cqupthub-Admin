import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store";
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/",
    name: "layout",
    component: () => import("../components/Layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home/index.vue"),
        meta: {
          title: "首页设置",
          icon: "home",
          showInMenu: true,
        },
      },
      {
        path: "/project",
        name: "project",
        component: () => import("../views/Project/index.vue"),
        meta: {
          title: "项目展示管理",
          icon: "project",
          showInMenu: true,
        },
      },
      {
        path: "/personnel",
        name: "personnel",
        component: () => import("../views/Personnel/index.vue"),
        meta: {
          title: "部门管理",
          icon: "personnel",
          showInMenu: true,
        },
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("../views/Contact/index.vue"),
        meta: {
          title: "联系方式设置",
          icon: "contact",
          showInMenu: true,
        },
      },
      {
        path: "/account",
        name: "account",
        component: () => import("../views/Account/index.vue"),
        meta: {
          title: "账号管理",
          icon: "account",
          showInMenu: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
