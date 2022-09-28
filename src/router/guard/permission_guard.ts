import { useUserStore } from "@/store/modules/user";
import { usePermissionStore } from "@/store/modules/permission";
import { NOT_FOUND_ROUTE } from "@/router/routes";
import { getToken } from "@/utils/token";
import { isNullOrWhitespace } from "@/utils/is";

const WHITE_LIST = ["/login", "/404"];
export function createPermissionGuard(router) {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to) => {
    const token = getToken();
    console.log("token", token);

    /** 没有token的情况, 直接跳转到登录页，并拼上想要跳转的路径 */
    if (isNullOrWhitespace(token)) {
      if (WHITE_LIST.includes(to.path)) return true;
      return { path: "login", query: { ...to.query, redirect: to.path } };
    }

    /** 有token的情况 */
    if (to.path === "/login") return { path: "/", replace: true };
    if (to.path === "/404") return true;

    // 已经拿到用户信息和权限信息
    console.log(userStore.userId);

    if (userStore.userId) {
      // refreshAccessToken();
      return true;
    }

    try {
      await userStore.getUserInfoAndAccess();
      const access = userStore.access;
      const accessRoutes = permissionStore.generateRoutes(access);
      accessRoutes.forEach((route) => {
        !router.hasRoute(route.name) && router.addRoute(route);
      });
      router.addRoute(NOT_FOUND_ROUTE);
      console.log(accessRoutes);

      return { ...to, replace: true };
    } catch (error) {
      console.error(error);
      return;
    }
  });
}
