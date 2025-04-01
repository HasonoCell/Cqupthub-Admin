import { createRouter, createWebHistory } from "vue-router";
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
          requireAuth: true,
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
          requireAuth: true,
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
          requireAuth: true,
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
          requireAuth: true,
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
          requireAuth: true,
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

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  
  // 需要登录的路由匹配规则
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  
  if (requiresAuth && !isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.path === '/login' && isLoggedIn) {
    next('/') // 已登录时禁止访问登录页
  } else {
    next()
  }
})

export default router;
