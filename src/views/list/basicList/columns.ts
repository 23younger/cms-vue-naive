import { format } from "date-fns";

export const columns = [
  {
    title: "id",
    key: "id",
    width: 100,
  },
  {
    title: "名称",
    key: "name",
    width: 100,
  },
  {
    title: "出仓时间",
    key: "date",
    width: 100,
    render(rowData) {
      return format(rowData.date, "yyyy-MM-dd hh:mm:ss");
    },
  },
];
