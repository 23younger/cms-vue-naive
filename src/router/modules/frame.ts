import { RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue");

const component = () => import("@/views/frame/index.vue");

const routes: Array<RouteRecordRaw> = [
  {
    name: "Frame",
    path: "/frame",
    component: Layout,
    redirect: "/frame/docs",
    meta: {
      title: "外部页面",
      icon: "iconoir:frame-select",
    },
    children: [
      {
        name: "FrameDocs",
        path: "docs",
        component,
        meta: {
          title: "内嵌百度",
          icon: "akar-icons:circle",
          frameSrc: "https://www.naiveui.com/",
          order: 0,
          access: ["a"],
        },
      },
    ],
  },
];

export default routes;
