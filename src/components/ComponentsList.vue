<template>
  <div class="create-component-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="component-item"
      @click="onItemClick(item as TextComponentProps)"
    >
      <l-text v-bind="item"></l-text>
    </div>
  </div>
  <StyledUploader @success="onImageUploaded"></StyledUploader>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidv4 } from "uuid";
import { message } from "ant-design-vue";
import { ComponentData } from "../store/editor";
import StyledUploader from "../components/StyledUploader.vue";
import { TextComponentProps, imageDefaultProps } from "../defaultProps";
import LText from "../components/LText.vue";
import { UploadResp } from "../extraType";
import { getImageDimensions } from "../helper";

export default defineComponent({
  name: "components-list",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    LText,
    StyledUploader,
  },
  emits: ["on-item-click"],
  setup(props, context) {
    const onItemClick = (props: TextComponentProps) => {
      const componentData: ComponentData = {
        id: uuidv4(),
        name: "l-text",
        props,
      };
      context.emit("on-item-click", componentData);
    };

    const onImageUploaded = (resp: UploadResp) => {
      console.log("111");
      const componentData: ComponentData = {
        name: "l-image",
        id: uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      };
      message.success("上传成功~~~");
      //   componentData.props.src = resp.data.url;
      componentData.props.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNuQbg08qC7p0Ab0r46sraeMXpnI4o4tH_fYjLiFRV6g&s";
      context.emit("on-item-click", componentData);
      getImageDimensions(componentData.props.src).then(({ width }) => {
        const maxWidth = 373;
        componentData.props.width =
          (width > maxWidth ? maxWidth : width) + "px";
          
        context.emit("on-item-click", componentData);
      });
    };

    return {
      onItemClick,
      onImageUploaded,
    };
  },
});
</script>

<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
.component-item > * {
  position: static !important;
}
</style>
