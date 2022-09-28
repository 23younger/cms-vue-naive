<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div flex items-center cursor-pointer>
      <img :src="userStore.avatar" alt="" mr-10 w-35 h-35 rounded-full />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { renderIcon } from "@/utils/icon";
import {} from "vue";

const userStore = useUserStore();

const options = [
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon("mdi:exit-to-app", { size: 14 }),
  },
];

const handleSelect = (key: string) => {
  if (key === "logout") {
    window.$dialog.warning({
      title: "提示",
      content: "确认退出？",
      maskClosable: false,
      positiveText: "确认",
      onPositiveClick: () => {
        // userStore.logout();
        window.$message.success("已退出登录");
      },
    });
  }
};
</script>

<style scoped lang="less"></style>
