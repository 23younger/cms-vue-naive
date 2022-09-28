import { RouteRecordRaw } from "vue-router";

export const basicRoutes: Array<RouteRecordRaw> = [
  // {
  //   name: "Home",
  //   path: "/",
  //   component: () => import("@/layout/index.vue"),
  //   redirect: {
  //     name: "Dashboard",
  //   },
  //   children: [
  //     {
  //       name: "Dashboard",
  //       path: "dashboard",
  //       component: () => import("@/views/dashboard/index.vue"),
  //       meta: {
  //         title: "Dashboard",
  //         icon: "mdi:table",
  //         access: "a",
  //       },
  //     },
  //     {
  //       name: "Unocss",
  //       path: "unocss",
  //       component: () => import("@/views/unocss/index.vue"),
  //       meta: {
  //         title: "unocss",
  //         access: "d",
  //       },
  //     },
  //     {
  //       name: "Table",
  //       path: "/table",
  //       redirect: {
  //         name: "BasicTable",
  //       },
  //       // component: () => import("@/views/table/index.vue"),
  //       // component: () => import("@/views/list/basicList/index.vue"),
  //       meta: {
  //         title: "table",
  //         icon: "mdi:table",
  //         access: "c",
  //       },
  //       children: [
  //         {
  //           name: "BasicTable",
  //           path: "basicTable",
  //           component: () => import("@/views/table/index.vue"),
  //           // component: () => import("@/views/list/basicList/index.vue"),
  //           meta: {
  //             title: "basicTable",
  //             icon: "mdi:table",
  //             access: "c",
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       name: "Redirect",
  //       path: "/redirect/:path(.*)",
  //       component: () => import("@/views/redirect/index.vue"),
  //       meta: {
  //         title: "Redirect",
  //         isHidden: true,
  //       },
  //     },
  //   ],
  // },
  {
    name: "Login",
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "Login",
      isHidden: true,
    },
  },
  {
    name: "404",
    path: "/404",
    component: () => import("@/views/error-pages/404.vue"),
    meta: {
      title: "404",
      isHidden: true,
    },
  },
  {
    name: "Redirect",
    path: "/redirect/:path(.*)",
    component: () => import("@/views/redirect/index.vue"),
    meta: {
      title: "Redirect",
      isHidden: true,
    },
  },
];

export const NOT_FOUND_ROUTE: RouteRecordRaw = {
  name: "NotFound",
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  meta: {
    isHidden: true,
  },
};

const modules = import.meta.glob("../modules/*.ts", { eager: true }) as any;
console.log("modules", modules);

const asyncRoutes: any[] = [];
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default);
});

export { asyncRoutes };
