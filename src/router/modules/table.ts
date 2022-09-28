import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    name: "Table",
    path: "/table",
    component: Layout,
    redirect: "/table/basicTable",
    meta: {
      title: "示例页面",
      customIcon: "logo",
      order: 3,
    },
    children: [
      {
        name: "BasicTable",
        path: "basicTable",
        component: () => import("@/views/table/index.vue"),
        meta: {
          title: "基础表格",
          icon: "ic:baseline-table-view",
          access: ["b"],
        },
      },
      {
        name: "BasicTable1",
        path: "basicTable1",
        component: () => import("@/views/list/basicList/index.vue"),
        meta: {
          title: "调试表格",
          icon: "ic:baseline-table-view",
          access: ["b"],
        },
      },
    ],
  },
];

export default routes;
