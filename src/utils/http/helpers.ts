import { toLogin } from "../auth";
import { isNullOrUndef } from "../is";
import { removeToken } from "../token";

interface ResError {
  code?: number;
  message?: string;
}

const TOKEN_CODE = "access_token";

const WITHOUT_TOKEN_API = [{ url: "/login", method: "POST" }];

export function isWithoutToken({ url, method = "" }) {
  return WITHOUT_TOKEN_API.some((item) => item.url === url && item.method === method.toUpperCase());
}

export function resolveResError(error: ResError = {}) {
  let { code, message } = error;
  if (isNullOrUndef(code)) {
    code = -1;
    message = message ?? "接口未知异常";
  } else {
    switch (code) {
      case 400:
        message = message ?? "请求参数错误";
        break;
      case 401:
        message = message ?? "登录已过期";
        removeToken(TOKEN_CODE);
        toLogin();
        break;
      case 403:
        message = message ?? "没有权限";
        break;
      case 404:
        message = message ?? "资源或接口不存在";
        break;
      case 500:
        message = message ?? "服务器异常";
        break;
      default:
        message = message ?? "操作异常！";
        break;
    }
  }
  return { code, message };
}
