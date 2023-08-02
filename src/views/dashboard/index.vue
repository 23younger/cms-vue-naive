<template>
  <div>dashboard</div>
  <button @click="openBoard(1)">点击1</button>
  <button @click="openBoard(2)">点击2</button>
  <h1>{{ input1 }}</h1>
  <h2>{{ input2 }}</h2>
  <!-- <portal to="keyboard-comp"> -->
    <SimpleKeyboard :input="keyboardInput" @close="closeFn" @current="currentFn" v-show="showBoard" />
  <!-- </portal> -->
</template>

<script setup lang="ts">
import SimpleKeyboard from '@/components/SimpleKeyboard/index.vue'
const keyboardInput = ref('123');
const showBoard = ref(false);
const type = ref(1);
const input1 = ref('');
const input2 = ref('');
const openBoard = (t) => {
  type.value = t
  if (t === 1) {
    keyboardInput.value = input1.value;
  } else {
    keyboardInput.value = input2.value;
  }
  showBoard.value = true;
}
const currentFn = (val) => {
  if (type.value === 1) {
    input1.value = val;
  } else if (type.value === 2) {
    input2.value = val;
  }
  showBoard.value = false;
}
const closeFn = () => {
  showBoard.value = false;
}
</script>

<style scoped lang="less"></style>
