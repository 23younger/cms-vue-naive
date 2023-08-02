<template>
  <div class="kb-wrapper">
    <div class="kb-content">
      <h3>{{ inputval }}</h3>
      <div :class="props.keyboardClass"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
import layout from 'simple-keyboard-layouts/build/layouts/chinese';

const emits = defineEmits(['current', 'close']);

const props = defineProps({
  keyboardClass: {
    default: 'simple-keyboard',
    type: String
  },
  input: {
    default: '',
    type: String,
  }
})

const data = reactive({
  keyboard: null as any,
  displayDefault: {
    '{bksp}': '删除',
    '{lock}': '大写',
    '{enter}': '确认',
    '{shift}': 'shift',
    '{change}': '中/英',
    '{clear}': '清空',
    '{close}': '关闭',
  }
})

const inputval = ref('');

const onChange = (input) => {
  data.keyboard.setInput(input);
  inputval.value = input;
}

const handleToggle = (btnstr: string) => {
  let currentLayout = data.keyboard.options.layoutName;
  let shiftToggle = 'default'
  if (btnstr === '{shift}') {
    shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
  } else if (btnstr === '{change}') {
    shiftToggle = currentLayout === 'change' ? 'default' : 'change'
  }
  data.keyboard.setOptions({
    layoutName: shiftToggle,
  })
}

const onKeyPress = (button, $event) => {
  // 点击关闭
  if (button === '{enter}') {
    emits('current', inputval.value)
    data.keyboard.setInput("");
    inputval.value = "";
    return false;
  } else if (button === '{close}') {
    emits('close');
    data.keyboard.setInput("");
    inputval.value = "";
    return false;
  } else if (button === '{change}') {
    // 切换中英文输入法
    if (data.keyboard.options.layoutCandidates !== null) {
      // data.displayDefault['{change}'] = '英文';
      // 切换至英文
      data.keyboard.setOptions({
        layoutCandidates: null,
        display: data.displayDefault,
      })
    } else {
      // 切换至中文
      // data.displayDefault['{change}'] = '中文';
      data.keyboard.setOptions({
        layoutCandidates: layout.layout,
        display: data.displayDefault,
      })
    }
  } else if (button === '{clear}') {
    data.keyboard.clearInput()
  } else {
    let value =
      $event.target.offsetParent.parentElement.children[0].children[0].value
    // 输入框有默认值时，覆写
    if (value) {
      data.keyboard.setInput(value)
    }
  }
  if (button === '{shift}' || button === '{change}') handleToggle(button);
}

onMounted(() => {
  data.keyboard = new Keyboard(props.keyboardClass, {
    onChange: onChange,
    onKeyPress: onKeyPress,
    layout: {
      // 默认布局
      default: [
        '1 2 3 4 5 6 7 8 9 0 {bksp}',
        'q w e r t y u i o p {close}',
        "{shift} a s d f g h j k l {enter}",
        '{change} z x c v b n m {clear}',
      ],
      // shift布局
      shift: [
        '1 2 3 4 5 6 7 8 9 0 {bksp}',
        'Q W E R T Y U I O P {close}',
        '{shift} A S D F G H J K L {enter}',
        '{change} Z X C V B N M {clear}',
      ],
      // change布局
      change: [
        '京 沪 浙 苏 粤 鲁 晋 冀 豫 {bksp}',
        '川 渝 辽 吉 黑 皖 鄂 津 贵 {close}',
        '云 桂 琼 青 新 藏 蒙 宁 甘 {enter}',
        '{change} 陕 闽 赣 湘 学 揉 警 军 港 澳 领 {clear}',
      ]
    },
    // 按钮展示文字
    display: data.displayDefault,
    // 按钮样式
    buttonTheme: [
      {
        class: 'hg-red close',
        buttons: '{close}',
      },
      {
        class: 'change',
        buttons: '{change}',
      },
    ],
    // 输入限制长度
    // maxLength: this.maxLength,
  })
})

watch(
  () => props.input,
  (val) => {
    data.keyboard.setInput(val);
    inputval.value = val;
  }
)
</script>

<style scoped lang="less">
.kb-wrapper {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .kb-content {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;

    h3 {
      width: 50%;
      display: inline-block;
      background: #ffffff;
      height: 2.5em;
      line-height: 2.5em;
      text-align: center;
      border-radius: 1em;
      margin-bottom: .5em;
      overflow: hidden;
    }

    :deep(.hg-functionBtn) {
      background: #adb5bb;
    }
  }
}
</style>
