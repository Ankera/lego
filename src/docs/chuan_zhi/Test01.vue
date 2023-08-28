<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 23:27:30 -->
<!-- 模块主要作用:  -->

<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ num }}</div>
    <button @click="send">+</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, defineExpose } from "vue";

interface DProps {
  title: string;
  num: number[];
}

const props = withDefaults(defineProps<DProps>(), {
  // 给默认值
  title: "zs",
  num: () => [12, 13, 14], // 复杂数据类型使用函数方式
});

console.log("props===", props);

interface EmitProps {
  (e: "on-item-click", num: number, name: string): void;
}

const emit = defineEmits<EmitProps>();

const send = () => {
  emit("on-item-click", 1, "aaa");
};

defineExpose({
  name1: "这是暴露的属性",
  open: () => {
    console.log('open')
  }
});
</script>

<style scoped></style>
