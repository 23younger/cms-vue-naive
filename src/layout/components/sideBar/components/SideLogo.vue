<template>
  <router-link to="/" f-c-c h-60>
    <icon-custom-logo text-36 />
    <h2 v-show="!appStore.collapsed" ml-10 text-16 color-primary max-w-140 font-bold>
      {{ title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";

const appStore = useAppStore();
const title = import.meta.env.VITE_APP_TITLE;
</script>

<style scoped lang="less"></style>
