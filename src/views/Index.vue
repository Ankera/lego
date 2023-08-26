<template>
  <!-- <uploader action="/utils/upload-img" drag listType="picture" >
    <h1>上传图片</h1>
  </uploader> -->
  <div class="homepage-container">
    <a-layout :style="{ backgroundColor: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">慕课乐高</router-link>
        </div>
        <user-profile :user="user"></user-profile>
      </a-layout-header>

      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer>
        © 慕课网（imooc.com）版权所有 | 津ICP备20000929号-2
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import UserProfile from "../components/UserProfile.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
// import Uploader from "../components/Uploader.vue";

export default defineComponent({
  name: "APP",
  components: {
    UserProfile,
    // Uploader,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const user = computed(() => store.state.user);
    return {
      user,
    };
  },
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
