<template>
  <transition name="fade-slide" mode="out-in" appear>
    <section class="cus-scroll-y wh-full p-15 flex-col bg-[#f5f6fb]">
      <slot></slot>
      <AppFooter v-if="showFooter" mt-15 />
    </section>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  showFooter: {
    type: Boolean,
    default: false,
  },
});
</script>
