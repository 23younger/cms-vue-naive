import { createRouter, createWebHistory } from "vue-router";
import { createGuard } from "./guard";
import { basicRoutes } from "./routes";

// 不用权限校验的路由
const constantRoutes: any[] = [...basicRoutes];
console.log("constantRoutes", constantRoutes);

export const router = createRouter({
  history: createWebHistory("/"),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app) {
  createGuard(router);
  app.use(router);
}
