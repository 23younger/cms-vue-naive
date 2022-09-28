import { lStorage } from "./cache";

const TOKEN_CODE = "access_token";
const DURATION = 6 * 60 * 60;

export function getToken(key?: string) {
  return lStorage.get(key || TOKEN_CODE);
}

export function setToken(key: string = TOKEN_CODE, token: string | undefined) {
  lStorage.set(key, token, DURATION);
}

export function removeToken(key: string) {
  lStorage.remove(key);
}

// 可能用不到刷新token操作
export async function refreshAccessToken() {
  // const tokenItem = lStorage.getItem(TOKEN_CODE);
  // if (!tokenItem) {
  //   return;
  // }
  // const { time } = tokenItem;
  // // token生成或者刷新后30分钟内不执行刷新
  // if (new Date().getTime() - time <= 1000 * 60 * 30) return;
  // try {
  //   const res = await api.refreshToken();
  //   setToken(res.data.token);
  // } catch (error) {}
}
