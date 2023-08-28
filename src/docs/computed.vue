<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 17:41:31 -->
<!-- 模块主要作用:  -->

<template>
  <div>
    
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, onBeforeMount } from 'vue';
const ins = getCurrentInstance();

console.log('ins', ins)

onBeforeMount(() => {
  console.log('onBeforeMount')
})
</script>

<style scoped>

</style>