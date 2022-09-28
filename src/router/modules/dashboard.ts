import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    name: "Dashboard",
    path: "/",
    component: Layout,
    redirect: "/workbench",
    meta: {
      title: "控制面板",
      icon: "mdi:home",
    },
    children: [
      {
        name: "Workbench",
        path: "workbench",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "工作台",
          icon: "akar-icons:circle",
          order: 0,
          access: ["a"],
        },
      },
    ],
  },
];

export default routes;
