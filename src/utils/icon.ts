import { h } from "vue";
import { NIcon } from "naive-ui";
import { Icon } from "@iconify/vue";
import SvgIcon from "@/components/Icon/SvgIcon.vue";

export function renderIcon(icon = "akar-icons:circle", props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) });
}

export function renderCustomIcon(icon, props = { size: 12 }) {
  return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) });
}
