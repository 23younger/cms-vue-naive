import { toLogin } from "../auth";
import { isNullOrUndef } from "../is";
import { getToken } from "../token";
import { resolveResError } from "./helpers";

export function reqResolve(config) {
  // 处理不需要token的情况
  if (isNullOrUndef(config)) {
    return config;
  }

  const token = getToken();
  if (!token) {
    // 未登录或token过期，跳转到登录页
    toLogin();
  }

  // 加上token
  config.headers["UAP_accessToken"] = token;

  // 防止缓存，给get请求添加时间
  if (config.method === "get") {
    config.params = { ...config.params, t: new Date().getTime() };
  }

  return config;
}

export function reqReject(error) {
  return Promise.reject(error);
}

export function resResolve(response) {
  const { noNeedTip } = response.config;

  if (response.data?.code !== 0) {
    const { code, message } = resolveResError(response.data);
    !noNeedTip && window.$message(message);
    return Promise.reject({ code, message, error: response?.data });
  }
  return Promise.resolve(response?.data);
}

export function resReject(error) {
  const { noNeedTip } = error.response?.config || error.config;
  const { code, message } = resolveResError(error.response?.data);
  !noNeedTip && window.$message.error(message);
  return Promise.reject({ code, message, error });
}
