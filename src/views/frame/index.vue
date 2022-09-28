<template>
  <n-spin :show="loading">
    <div class="frame">
      <iframe :src="frameSrc" class="frame-iframe" ref="frameRef"></iframe>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
const route = useRoute();
const loading = ref<boolean>(false);
const frameSrc = ref<string>("");
const frameRef = ref<HTMLIFrameElement | null>(null);

if (unref(route.meta)?.frameSrc) {
  frameSrc.value = unref(route.meta)?.frameSrc as string;
}

function hideLoading() {
  loading.value = false;
}

function init() {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent("onload", () => {
        hideLoading();
      });
    } else {
      _frame.onload = () => {
        hideLoading();
      };
    }
  });
}

onMounted(() => {
  loading.value = true;
  init();
});
</script>

<style scoped lang="less">
.frame {
  width: 100%;
  height: 100vh;

  &-iframe {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
    box-sizing: border-box;
  }
}
</style>
