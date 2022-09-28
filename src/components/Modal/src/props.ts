import { NModal } from "naive-ui";

export const basicProps = {
  ...NModal.props,
  // 确认按钮文字
  subBtnText: {
    type: String,
    default: "确认",
  },
  // 展示icon
  showIcon: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 446,
  },
  // 表格标题
  title: {
    type: String,
    default: "",
  },
  maskClosable: {
    type: Boolean,
    default: false,
  },
  preset: {
    type: String,
    default: "dialog",
  },
};
