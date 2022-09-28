<template>
  <n-breadcrumb>
    <n-breadcrumb-item
      v-for="item in route.matched.filter((v) => !!v.meta?.title)"
      :key="item.path"
      @click="handleClick(item)"
    >
      <component :is="getIcon(item.meta)" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { renderCustomIcon, renderIcon } from "@/utils/icon";

const router = useRouter();
const route = useRoute();

const handleClick = (item) => {
  if (item.redirect === route.path || item.path === route.path) {
    return;
  }
  router.push(item.path);
};

const getIcon = (meta) => {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 });
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 });
  return null;
};
</script>

<style scoped lang="less"></style>
