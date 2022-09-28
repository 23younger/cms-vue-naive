<template>
  <n-menu
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    :value="curRoute.meta?.activeMenu || curRoute.name"
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { usePermissionStore } from "@/store/modules/permission";

import { isExternal } from "@/utils/is";
// import { useAppStore } from '@/store/modules/app'
import { renderCustomIcon, renderIcon } from "@/utils/icon";

const router = useRouter();
const curRoute = useRoute();
const permissionStore = usePermissionStore();
// const appStore = useAppStore()

const menuOptions = computed(() => {
  return permissionStore.menus.map((item) => getMenuItem(item)).sort((a, b) => a.order - b.order);
});
console.log("menuOptions", menuOptions);

function resolvePath(basePath, path) {
  if (isExternal(path)) return path;
  return (
    "/" +
    [basePath, path]
      .filter((path) => !!path && path !== "/")
      .map((path) => path.replace(/(^\/)|(\/$)/g, ""))
      .join("/")
  );
}

function getMenuItem(route, basePath = "") {
  let menuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: getIcon(route.meta),
    order: route.meta?.order || 0,
    children: null,
  };

  const visibleChildren = route.children ? route.children.filter((item) => item.name && !item.meta?.isHidden) : [];

  if (!visibleChildren.length) return menuItem;

  menuItem.children = visibleChildren.map((item) => getMenuItem(item, menuItem.path)).sort((a, b) => a.order - b.order);

  return menuItem;
}

function getIcon(meta) {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: meta.levelFirst ? 18 : 10 });
  if (meta?.icon) return renderIcon(meta.icon, { size: meta.levelFirst ? 18 : 10 });
  return null;
}

function handleMenuSelect(key, item) {
  console.log(key);

  if (isExternal(item.path)) {
    window.open(item.path);
  } else {
    if (item.path === curRoute.path) {
      // appStore.reloadPage()
    } else {
      router.push(item.path);
    }
  }
}
</script>

<style scoped lang="less">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        border-left: 4px solid var(--primary-color);
      }
    }
  }
}
</style>
