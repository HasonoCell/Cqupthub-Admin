import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../store"
import {
  House,
  User,
  Operation,
  ChatRound,
  Avatar,
} from "@element-plus/icons-vue";

const routes = [
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('../views/Login/Login.vue') 
  },
  {
    path: "/",
    name: 'layout',
    component: () => import('../components/Layout/index.vue'),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Home/index.vue"),
        meta: {
          title: "首页设置",
          icon: House,
          showInMenu: true,
        },
      },
      {
        path: "/project",
        name: "project",
        component: () => import("../views/Project/index.vue"),
        meta: {
          title: "项目展示管理",
          icon: Operation,
          showInMenu: true,
        },
      },
      {
        path: "/personnel",
        name: "personnel",
        component: () => import("../views/Personnel/index.vue"),
        meta: {
          title: "部门管理",
          icon: User,
          showInMenu: true,
        },
      },
      {
        path: "/contact",
        name: "contact",
        component: () => import("../views/Contact/index.vue"),
        meta: {
          title: "联系方式设置",
          icon: ChatRound,
          showInMenu: true,
        },
      },
      {
        path: "/account",
        name: "account",
        component: () => import("../views/Account/index.vue"),
        meta: {
          title: "账号管理",
          icon: Avatar,
          showInMenu: true,
        },
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
