<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </AppProvider>
  <portal-target name="keyboard-comp"></portal-target>
</template>

<script setup lang="ts">
import AppProvider from "@/components/AppProvider/index.vue";
// import { useUserStore } from "./store/modules/user";
// const userStore = useUserStore();
// userStore.getUserInfo();
// userStore.getUserAccess();
</script>

<style scoped lang="less"></style>
