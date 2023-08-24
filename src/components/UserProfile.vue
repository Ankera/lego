<template>
  <a-button type="primary" class="user-profile-component" v-if="!user.isLogin" @click="login">
    登录
  </a-button>
  <div v-else>
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ user.userName }}</router-link>
      <template v-slot:overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="createDesign">创建作品</a-menu-item>
          <a-menu-item key="1"
            ><router-link to="/works">我的作品</router-link></a-menu-item
          >
          <a-menu-item key="2" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps } from "../store/index";
import { UserProps } from '../store/user'

export default defineComponent({
  name: "user-profile",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()

    const logout = () => {
      store.commit('logout')
      message.success('退出登录', 2)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    };

    const login = () => {
      store.commit('login')
      message.success('登录成功', 2)
    };

    const createDesign = () => {
      return 2;
    }

    return {
      logout,
      login,
      createDesign
    }
  },
});

</script>

<style>
.user-profile-dropdown {
  border-radius: 2px !important;
}
.user-operation > * {
  margin-left: 30px !important;
}
</style>