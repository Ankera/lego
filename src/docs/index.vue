<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 13:06:08 -->
<!-- 模块主要作用:  -->

<template>
  <div>{{ obj }}</div>
  <button @click="updateParams">修改</button>
  <div>{{name}} --- {{age}}</div>
  <hr>
  <Computed />
</template>

<script setup lang="ts">
import { ref, reactive, customRef, toRef } from "vue";
import Computed from './computed.vue'

function MyRef<T>(value: T) {
  let timer: any;
  return customRef((track, trigger) => {
    return {
      get() {
        // 收集依赖
        track();
        return value;
      },
      set(newVal) {
        clearTimeout(timer);

        timer = setTimeout(() => {
          // 触发依赖
          trigger();
          value = newVal;
          timer = null;
        }, 1000);
      },
    };
  });
}

const obj = MyRef<string>("这是Myref");

const updateParams = () => {
  obj.value = "这是修改后的";

  console.log("obj", obj);
};

const toRefs = <T extends object>(object: T) => {
  const map: any= {};
  for (const key in object) {
    map[key] = toRef(object, key);
  }
  return map;
};

const man = reactive({name: "Tom", age: 12})

const { name, age } = toRefs(man);
</script>

<style scoped></style>
