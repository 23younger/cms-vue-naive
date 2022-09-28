import request from "../utils/http";

enum Api {
  Login = "/user/login",
  Logout = "/user/logout",
  GetUserInfo = "/user/info",
  GetUserAccess = "/user/access",
  GetPermCode = "/dili-uap/api/authenticationApi/getResources",
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
