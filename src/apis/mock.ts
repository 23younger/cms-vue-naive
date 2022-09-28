import request from "../utils/http";

enum Api {
  GoodsList = "/list/goods",
}

export function fetchGoodsList(data) {
  return request({
    url: Api.GoodsList,
    method: "post",
    data,
  });
}
