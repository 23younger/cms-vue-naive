import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "@/utils/token";
import { fetchUserInfo, fetchUserAccess, fetchLogout, fetchLogin } from "@/apis/user";
import { usePermissionStore } from "./permission";
// import { usePermissionStore } from "./permission";

enum defaultValue {
  avatar = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201908%2F19%2F20190819150344_ALnaX.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665908683&t=820d6d6f6a581fccc154485d2fdf39c9",
}

export interface UserState {
  token?: string;
  welcome?: string;
  userAccessMenu: any[];
  userInfo: UserInfo;
}

const TOKEN_CODE = "access_token";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: {},
    userAccessMenu: [],
    token: "",
  }),
  getters: {
    getToken(): string {
      console.log("kkkkkkkkkk", this.token, getToken(TOKEN_CODE));

      return this.token || getToken(TOKEN_CODE);
    },
    userId(): number | undefined {
      return this.userInfo.id || undefined;
    },
    name(): string | undefined {
      return this.userInfo.name || "";
    },
    avatar(): string | undefined {
      return this.userInfo.avatar || defaultValue.avatar;
    },
    role(): string | undefined {
      return this.userInfo.role || "";
    },
    access(): any[] {
      return this.userAccessMenu || [];
    },
    getPermissions(): any[] {
      return this.userAccessMenu || [];
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
      setToken(TOKEN_CODE, info);
    },
    async getUserInfo(): Promise<UserInfo> {
      const { data } = await fetchUserInfo();
      this.setUserInfo(data);
      return data;
    },
    async getUserAccess() {
      const { data } = await fetchUserAccess();
      this.setUserAccessMenu(data);
      return data;
    },
    async getUserInfoAndAccess() {
      await this.getUserInfo();
      await this.getUserAccess();
    },
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: string;
      }
    ): Promise<UserInfo | null> {
      const { goHome = true, mode, ...loginParams } = params;
      console.log(goHome, mode, loginParams);
      console.log("进入登录");

      const { data } = await fetchLogin();
      console.log("denglu data", data);

      const { token } = data;
      this.setToken(token);
      return this.afterLogin();
    },
    async logout() {
      removeToken(TOKEN_CODE);
      this.setUserInfo({});
      this.setUserAccessMenu([]);
      // fetchLogout();
    },

    // 获取用户信息，生成路由
    async afterLogin() {
      if (!this.getToken) return null;
      console.log("afterlogin");

      const userInfo = await this.getUserInfo();
      const access = await this.getUserAccess();

      // 处理路由权限 ty_todo
      const usePermission = usePermissionStore();
      usePermission.generateRoutes(access);

      return userInfo;
    },
    setUserInfo(data) {
      this.userInfo = data;
    },
    setUserAccessMenu(data: any[]) {
      this.userAccessMenu = data;
    },
  },
});
