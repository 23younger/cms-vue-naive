import type { Router } from "vue-router";
import { useUserStore } from "@/store/modules/user";

export async function autoLoginGuard(router: Router) {
  const userStore = useUserStore();
  router.beforeEach(async () => {
    const token = userStore.getToken;

    if (!token) {
      try {
        const userInfo = await userStore.login({
          username: "",
          password: "",
        });

        if (userInfo) {
          window.$notification.success({
            message: "登录成功",
            description: `欢迎回来: ${userInfo.name}`,
            // duration: 3,
          });
        }
      } catch (error) {}
    }

    return true;
  });
}
