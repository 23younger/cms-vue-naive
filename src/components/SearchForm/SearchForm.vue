<template>
  <div class="search-from">
    <!-- <n-form label-placement="left" :rules="rules"> -->
    <n-form label-placement="left">
      <n-space :size="[35, 15]">
        <n-form-item v-for="item in (formItemList as FormItem[])" :key="item.key" :label="item.label" :path="item.key">
          <n-input
            v-if="item.type === 'input'"
            v-model:value="formData[item.key]"
            :placeholder="item.placeholder || '请输入'"
          />
          <n-select
            v-if="item.type === 'select'"
            v-model:value="formData[item.key]"
            :placeholder="item.placeholder"
            :options="item.options"
          />
          <n-date-picker
            v-if="item.type === 'date-picker'"
            v-model:value="formData[item.key]"
            type="daterange"
            :is-date-disabled="disablePreviousDate"
            separator="至"
            clearable
          />
        </n-form-item>
        <div flex-shrink-0>
          <n-button secondary type="primary" @click="resetForm">重置</n-button>
          <n-button ml-20 type="primary" @click="submitForm">搜索</n-button>
        </div>
      </n-space>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import componentSetting from "@/settings/componentSetting";
const emit = defineEmits(["search", "reset"]);
const props = defineProps({
  formItemList: {
    type: Array,
    required: true,
    default: [] as FormItem[],
  },
  // rules: {
  //   type: Array,
  //   default: [],
  // },
});

const formData = reactive({});
const disablePreviousDate = (ts: number) => {
  return ts > Date.now();
};
onMounted(() => {
  props.formItemList.forEach((item: FormItem) => {
    formData[item.key] = item.value;
    if (item.key === "date") {
      const nowTimestamp = Date.now();
      const beforeTimestamp = nowTimestamp - componentSetting.datePicker.seperateTime;
      formData[item.key] = [beforeTimestamp, nowTimestamp];
    }
  });
});

onUnmounted(() => {
  console.log("onUnmounted....");
});

const resetForm = () => {
  props.formItemList.forEach((item: FormItem) => {
    formData[item.key] = item.value;
  });
};

const submitForm = () => {
  emit("search", formData);
};
</script>

<style scoped lang="less">
.search-form {
  padding: 12px;
  margin-bottom: 10px;
}

.n-select {
  min-width: 100px !important;
  width: auto;
}

.n-date-picker {
  width: 300px !important;
}
</style>
