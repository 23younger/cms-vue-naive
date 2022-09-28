<template>
  <n-config-provider :locale="locale" :date-locale="dateLocale" wh-full :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup name="AppProvider" lang="ts">
import { useLoadingBar, useDialog, useMessage, useNotification } from "naive-ui";
import { defineComponent, h } from "vue";
import { zhCN, dateZhCN } from "naive-ui";
import type { NLocale, NDateLocale } from "naive-ui";

const locale = ref<NLocale | null>(zhCN);
const dateLocale = ref<NDateLocale | null>(dateZhCN);

const themeOverrides = {
  common: {
    primaryColor: "#2d8cf0",
    primaryColorHover: "#2d8cf0",
    primaryColorPressed: "#2d8cf0",
    primaryColorSuppl: "#2d8cf0",
  },
};

// 挂载naive组件至全局以供调用
function setupNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  setup() {
    setupNaiveTools();
  },
  render() {
    return h("div");
  },
});
</script>

<style scoped lang="less"></style>
