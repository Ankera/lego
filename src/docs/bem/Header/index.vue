<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 22:15:36 -->
<!-- 模块主要作用:  -->

<template>
  <div class="xm-header">
    Header
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const demo = ref<number>(1);
console.log('demo=', demo)

</script>

<style lang="scss">
@import '../index.scss';

@include b(header) {
  height: 60px;
  border-bottom: 1px solid #ccc;
}
</style>