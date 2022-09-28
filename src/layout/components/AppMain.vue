<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <keep-alive :include="keepAliveRouteNames">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="AppMain">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const allRoutes = router.getRoutes();

const keepAliveRouteNames = computed(() => {
  const karns: string[] = [];
  allRoutes
    .filter((route) => route.meta?.keepAlive)
    .map((route) => {
      const name: any = route.name;
      karns.push(name);
    });
  // return allRoutes.filter((route) => route.meta?.keepAlive).map((route) => route.name) || [];
  return karns;
});
</script>

<style scoped lang="less"></style>
