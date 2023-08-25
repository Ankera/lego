<template>
  <div class="file-upload">
    <div class="upload-area" @click="triggerUpload" >
      <slot v-if="isUploading" name="loading">
        <button disabled>正在上传</button>
      </slot>
      <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.data">
        <button>点击上传</button>
      </slot>
      <slot v-else name="default">
        <button>点击上传</button>
      </slot>
    </div>
    <input
      ref="fileInput"
      type="file"
      :style="{ display: 'none' }"
      @change="handleFileChange"
    />
    <ul class="upload-list">
      <li
        :class="`upload-file upload-${file.status}`"
        v-for="file in uploadFiles"
        :key="file.uid"
      >
        <span v-if="file.status === 'loading'" class="file-icon"
          ><LoadingOutlined
        /></span>
        <span v-else class="file-icon"><FileOutlined /></span>
        <span class="filename">{{ file.name }}</span>
        <span class="delete-icon" @click="removeFile(file.uid)"
          ><DeleteOutlined
        /></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, PropType } from "vue";
import axios from "axios";
import {
  DeleteOutlined,
  LoadingOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { last } from 'lodash-es'
import { v4 as uuidv4 } from "uuid";
type UploadStaus = "ready" | "loading" | "success" | "error";
type FileListType = "picture" | "text";
type CheckUpload = (file: File) => boolean | Promise<File>;

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: UploadStaus;
  raw: File;
  resp?: any;
  url?: string;
}

export default defineComponent({
  name: "uploader",
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined,
  },
  setup(props) {
    const fileInput = ref<null | HTMLInputElement>(null);

    const uploadFiles = ref<UploadFile[]>([]);

    const isUploading = computed(() => {
      return uploadFiles.value.some(
        (file: UploadFile) => file.status === "loading"
      );
    });

    const lastFileData = computed(() => {
      const lastFile = last(uploadFiles.value)
      if (lastFile) {
        return {
          loaded: lastFile.status === 'success',
          data: lastFile.resp
        }
      }
      return false
    })

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    const removeFile = (id: string) => {
      uploadFiles.value = uploadFiles.value.filter((file) => file.uid !== id);
    };

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadFile = files[0];
        const formData = new FormData();
        formData.append(uploadFile.name, uploadFile);

        const fileObj = reactive<UploadFile>({
          uid: uuidv4(),
          name: uploadFile.name,
          size: uploadFile.size,
          status: "loading",
          raw: uploadFile,
        });

        uploadFiles.value.push(fileObj);

        axios
          .post(props.action, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp: any) => {
            fileObj.status = "success";
            fileObj.resp = resp.data;
          })
          .catch(() => {
            fileObj.status = "error";
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = "";
            }
          });
      }
    };

    return {
      fileInput,
      isUploading,
      uploadFiles,
      triggerUpload,
      handleFileChange,
      removeFile,
      lastFileData,
    };
  },
});
</script>

<style>
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.upload-list li {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
}
.upload-list li:first-child {
  margin-top: 10px;
}
.upload-list li .upload-list-thumbnail {
  vertical-align: middle;
  display: inline-block;
  width: 70px;
  height: 70px;
  position: relative;
  z-index: 1;
  background-color: #fff;
  object-fit: cover;
}
.upload-list li .file-icon svg {
  margin-right: 5px;
  color: rgba(0, 0, 0, 0.45);
}
.upload-list li .filename {
  margin-left: 5px;
  margin-right: 40px;
}
.upload-list li.upload-error {
  color: #f5222d;
}
.upload-list li.upload-error svg {
  color: #f5222d;
}
.upload-list li .file-status {
  display: block;
  position: absolute;
  right: 5px;
  top: 0;
  line-height: inherit;
}
.upload-list li .delete-icon {
  display: none;
  position: absolute;
  right: 7px;
  top: 0;
  line-height: inherit;
  cursor: pointer;
}
.upload-list li:hover {
  background-color: #efefef;
}
.upload-list li:hover .file-status {
  display: none;
}
.upload-list li:hover .delete-icon {
  display: block;
}
</style>
