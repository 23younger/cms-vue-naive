<template>
  <n-modal v-modal:show="isModal">
    <template #header>
      <div>{{ getBindValues.title }}</div>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #action v-if="!$slots.action">
      <n-space>
        <n-button @click="closeModal">取消</n-button>
        <n-button type="primary" :loading="subLoading" @click="handleSubmit">{{ subBtnText }}</n-button>
      </n-space>
    </template>
    <template #action v-else>
      <slot name="action"></slot>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import {} from "vue";
import { basicProps } from "./props";
import { ModalProps, ModalMethods } from "./type";

const attrs = useAttrs();
const props = defineProps({ ...basicProps });
const emit = defineEmits(["on-ok", "on-close", "register"]);

const propsRef = ref<Partial<ModalProps> | null>(null);

const isModal = ref(false);
const subLoading = ref(false);

const getProps = computed(() => {
  return { ...props, ...(unref(propsRef) as any) };
});

const subBtnText = computed(() => {
  const { subBtnText } = propsRef.value as any;
  return subBtnText || props.subBtnText;
});

// const setProps = async (mpdalProps: Partial<ModalProps>): Promise<void> => {
//   propsRef.value =
// }

const getBindValues = computed(() => {
  return {
    ...attrs,
    ...unref(getProps),
    ...unref(propsRef),
  };
});

const setLoading = (status: boolean) => {
  subLoading.value = status;
};

const openModal = () => {
  isModal.value = true;
};

const closeModal = () => {
  isModal.value = false;
  subLoading.value = false;
  emit("on-close");
};

const onCloseModal = () => {
  isModal.value = false;
  emit("on-close");
};

const handleSubmit = () => {
  subLoading.value = true;
  emit("on-ok");
};

const modalMethods: ModalMethods = {};
</script>

<style scoped lang="less"></style>
