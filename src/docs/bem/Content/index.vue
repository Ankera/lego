<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 22:15:19 -->
<!-- 模块主要作用:  -->

<template>
  <div class="xm-content">
    <h1>Content</h1>
    <div class="xm-content__item" v-for="item in 100" :key="item">
      <div>{{item}}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const demo = ref<number>(1);
console.log('demo=', demo)

</script>

<style lang="scss">
@import '../index.scss';

@include b(content) {
  flex: 1;
  overflow: auto;

  @include e(item) {
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
}
</style>