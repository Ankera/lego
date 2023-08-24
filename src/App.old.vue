<template>
    <div class="homepage-container" v-if="withHeader">
      <a-layout :style="{ backgroundColor: '#fff' }">
        <a-layout-header class="header">
          <div class="page-title">
            <router-link to="/">慕课乐高</router-link>
          </div>
        </a-layout-header>
  
        <a-layout-content class="home-layout">
         <router-view></router-view>
        </a-layout-content>
  
        <a-layout-footer>
          © 慕课网（imooc.com）版权所有 | 津ICP备20000929号-2
        </a-layout-footer>
      </a-layout>
    </div>
    <div class="homepage-container" v-else>
      <router-view></router-view>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useRoute } from 'vue-router'
  
  export default defineComponent({
    name: "APP",
    setup() {
      const route = useRoute()
      const withHeader = computed(() => route.meta.withHeader)
      return {
        withHeader
      };
    },
  });
  </script>
  
  <style>
  * {
    padding: 0;
    margin: 0;
  }
  
  .page-title {
    color: #fff;
  }
  
  .content-container {
    background: #fff;
    padding: 0 24px 24px 30px;
    min-height: 85vh;
    max-width: 1200px;
    margin: 50px auto;
    width: 100%;
  }
  </style>
  