<!-- 作者: 余亚勇 -->
<!-- 创建时间: 2023-08-28 13:06:08 -->
<!-- 模块主要作用:  -->

<template>
  <div>{{ obj }}</div>
  <button @click="updateParams">修改</button>
  <div>{{ name }} --- {{ age }}</div>
  <hr />
  <div>组件之间传值</div>
  <CZTest01 ref="ts01Ref" :title="'parent'" @onItemClick="onItemClick" />
  <hr />
  <Computed />
  <BemIndex />
</template>

<script setup lang="ts">
import { ref, reactive, customRef, toRef, onMounted } from "vue";
import Computed from "./computed.vue";
import BemIndex from "./bem/index.vue";
import CZTest01 from "./chuan_zhi/Test01.vue";

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
  const map: any = {};
  for (const key in object) {
    map[key] = toRef(object, key);
  }
  return map;
};

const man = reactive({ name: "Tom", age: 12 });

const { name, age } = toRefs(man);

const onItemClick = (a: any, b: any) => {
  console.log("aa", a, b);
};

interface Ts01RefProps {
  name1: string;
  open: Function;
}

const ts01Ref = ref<Ts01RefProps>();

onMounted(() => {
  console.log(1122, ts01Ref.value?.name1)
});
</script>

<style scoped></style>
