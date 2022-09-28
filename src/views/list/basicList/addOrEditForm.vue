<template>
  <n-form :model="formData" :rules="rules" ref="formRef" label-placement="left" :label-width="80" class="py-4">
    <n-form-item label="名称" path="name">
      <n-input placeholder="请输入名称" v-model:value="formData.name" />
    </n-form-item>
    <n-form-item label="地址" path="address">
      <n-input type="textarea" placeholder="请输入地址" v-model:value="formData.address" />
    </n-form-item>
    <n-form-item label="日期" path="date">
      <n-date-picker type="datetime" placeholder="请选择日期" v-model:value="formData.date" />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import {} from "vue";
const props = defineProps({
  formData: {
    type: Object,
  },
  rules: {
    type: Array,
  },
});
</script>

<style scoped lang="less"></style>
