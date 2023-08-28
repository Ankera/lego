<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 21:35:07 -->
<!-- 模块主要作用:  -->

<template>
  <!-- <div>
    <div class="xm-test">Test BEM</div>
    <div class="xm-test__inner">inner</div>
    <div class="xm-test--primary">primary</div>
  </div> -->


  

  <div class="xm-box">
    <div>
      <Menu></Menu>
    </div>
    <div class="xm-box__right">
      <Header />
      <Content />
    </div>
  </div>
</template>

<script setup lang="ts">
import Content from "./Content/index.vue";
import Header from "./Header/index.vue";
import Menu from "./Menu/index.vue";
</script>

<style lang="scss">
@import './index.scss';

@include b(test) {
  color: red;

  @include e(inner) {
    color: blue;
  }

  @include m(primary) {
    color: orange;
  }
}

@include b(box) {
  @include bfc;
  display: flex;
  height: 100vh;

  @include e(right) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
