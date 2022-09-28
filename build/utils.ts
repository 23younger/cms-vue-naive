/**
 * ! vite执行时相关方法配置
 */

import path from "path";

// * node环境下统一处理env环境变量
export function wrapperEnv(envOptions) {
  if (!envOptions) return {};
  const rst = {};

  for (const key in envOptions) {
    let val = envOptions[key];
    if (["true", "false"].includes(val)) {
      val = val === "true";
    }
    if (["VITE_PORT"].includes(key)) {
      val = +val;
    }
    if (key === "VITE_PROXY" && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'));
      } catch (error) {
        val = "";
      }
    }
    rst[key] = val;
    if (typeof key === "string") {
      process.env[key] = val;
    } else if (typeof key === "object") {
      process.env[key] = JSON.stringify(val);
    }
  }
  return rst;
}

// * 处理代理
const httpsReg = /^https:\/\//;
export function createProxy(list: any[] = []) {
  const res = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target);
    res[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      secure: isHttps,
      // rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
    };
  }
  return res;
}

/**
 * * 项目根目录
 * @description 结尾不带/
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * * 项目src目录
 * * @param srcName src目录名称(默认: "src")
 * @descrition 结尾不带斜杠
 */
export function getSrcPath(srcName = "src") {
  return path.resolve(getRootPath(), srcName);
}
