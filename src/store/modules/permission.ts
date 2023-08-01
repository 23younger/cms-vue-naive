import { defineStore } from "pinia";
import { asyncRoutes, basicRoutes } from "@/router/routes";
import { getMenuList, getPermCodeList } from "@/apis/user";
import { AppRouteRecordRaw } from "@/router/types";

function hasPermission(route, access) {
  // * 不需要权限直接返回true
  if (!route.meta?.access || !route.meta?.access.length) return true;

  const routeRole = route.meta?.access ? route.meta.access : [];

  // * 登录用户没有角色或者路由没有设置角色判定为没有权限
  if (!access.length || !routeRole.length) return false;

  // * 路由指定的角色包含任一登录用户角色则判定有权限
  return access.some((item) => routeRole.includes(item));
}

function filterAsyncRoutes(routes: any[] = [], access) {
  console.log("asyncroutes", routes, access);

  const ret: any[] = [];
  routes.forEach((route: any) => {
    if (hasPermission(route, access)) {
      const curRoute = {
        ...route,
        children: [],
      };
      if (route.children && route.children.length) {
        curRoute.children = filterAsyncRoutes(route.children, access);
        if (curRoute.children.length) {
          ret.push(curRoute);
        }
      } else {
        Reflect.deleteProperty(curRoute, "children");
        ret.push(curRoute);
      }
      // ret.push(curRoute);
    }
  });
  return ret;
}

export interface PermissionState {
  permCodeList: string[] | number[];
  accessRoutes: any[];
}

export const usePermissionStore = defineStore("permission", {
  state: (): PermissionState => ({
    permCodeList: [],
    accessRoutes: [],
  }),
  getters: {
    routes(): any[] {
      return basicRoutes.concat(this.accessRoutes);
    },
    menus(): any[] {
      return this.routes.filter((route) => {
        route.meta.levelFirst = true;
        return route.name && !route.meta?.isHidden;
      });
    },
  },
  actions: {
    generateRoutes(access: any[] = []) {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, access);
      this.accessRoutes = accessRoutes;
      return accessRoutes;
    },
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    async getPermCodeList() {
      const { data } = await getPermCodeList();
      const { codeList } = data;
      this.setPermCodeList(codeList);
    },
    async buildRoutesAction() {
      window.$message.loading({
        content: "菜单加载中...",
        duration: 1,
      });

      let routeList: AppRouteRecordRaw[] = [];
      try {
        this.getPermCodeList();
        const { data } = await getMenuList();
        routeList = data.routeList as AppRouteRecordRaw[];
      } catch (error) {
        console.warn(error);
      }
      // 处理routeList
    },
  },
});
