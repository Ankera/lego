<template>
  <div class="app-container">
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
</style>
