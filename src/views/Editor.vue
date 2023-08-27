<template>
  <div class="editor-container">
    <a-layout :style="{ backgroundColor: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">慕课乐高</router-link>
        </div>
      </a-layout-header>

      <a-layout>
        <a-layout-sider width="300" style="background-color: yellow">
          <div class="sidebar-container">
            <components-list
              :list="defaultTextTemplates"
              @onItemClick="addItem"
            />
          </div>
        </a-layout-sider>

        <a-layout style="padding: 0 24px 24px">
          <a-layout-content class="preview-container">
            <p>画布区域</p>
            <hello-test></hello-test>
            <div class="preview-list" id="canvas-area">
              <!-- <div v-for="component in components" :key="component.id">
                {{ component.props.text }}
              </div> -->
              <EditWrapper
                v-for="component in components"
                :key="component.id"
                :id="component.id"
                :active="component.id === (currentElement && currentElement.id)"
                @setActive="setActive"
              >
                <component :is="component.name" v-bind="component.props" />
              </EditWrapper>
            </div>
          </a-layout-content>
        </a-layout>

        <a-layout-sider
          width="300"
          style="background: #fff"
          class="settings-panel"
        >
          组件属性
          <props-table
            v-if="currentElement && currentElement.props"
            :props="currentElement.props"
            @change="handleChange"
          ></props-table>
          <pre>{{ currentElement && currentElement.props }}</pre>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { ComponentData } from "../store/editor";
import ComponentsList from "../components/ComponentsList.vue";
import EditWrapper from "../components/EditWrapper.vue";
import PropsTable from "../components/PropsTable.vue";
import LText from "../components/LText.vue";
import LImage from "../components/LImage.vue";
import defaultTextTemplates from "../defaultTemplates";

export default defineComponent({
  name: "editor",
  components: {
    LText,
    LImage,
    ComponentsList,
    EditWrapper,
    PropsTable,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const components = computed<ComponentData[]>(
      () => store.state.editor.components
    );
    const currentElement = computed<ComponentData | null>(
      () => store.getters.getCurrentElement
    );

    // const addItem = (props: any) => {
    //   store.commit("addComponent", props);
    // };
    const addItem = (component: any) => {
      store.commit("addComponent", component);
    };

    const setActive = (props: any) => {
      store.commit("setActive", props);
    };

    const handleChange = (e: any) => {
      store.commit('updateComponent', e);
    }

    return {
      components,
      defaultTextTemplates,
      addItem,
      setActive,
      currentElement,
      handleChange
    };
  },
});
</script>

<style>
.page-title {
  color: #fff;
  display: flex;
}
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
.page-title .inline-edit span {
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
}
.preview-list.canvas-fix .edit-wrapper > * {
  box-shadow: none !important;
}
.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
</style>
