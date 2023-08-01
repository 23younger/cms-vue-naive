import request from "../utils/http";

enum Api {
  Login = "/user/login",
  Logout = "/user/logout",
  GetUserInfo = "/user/info",
  GetUserAccess = "/user/access",
  GetPermCode = "/dili-uap/api/authenticationApi/getResources",
  GetMenuList = "/dili-uap/api/authenticationApi/getMenuList",
}

export function fetchLogin() {
  return request.post<LoginResult>(Api.Login);
}

export function fetchUserInfo(data) {
  console.log("qingqiu", data);

  return request({
    url: Api.GetUserInfo,
    method: "get",
  });
}

export function fetchUserAccess() {
  return request({
    url: Api.GetUserAccess,
    method: "post",
  });
}

export function fetchLogout() {
  return request({
    url: Api.Logout,
    method: "post",
  });
}

export function getPermCodeList() {
  return request({
    url: Api.GetPermCode,
    method: "get",
  });
}

export function getMenuList() {
  return request({
    url: Api.GetMenuList,
    method: "get",
  });
}
