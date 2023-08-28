#### Vue3 学习总结

#### 1、customRef

```typescript
// 类似防抖
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
// chrome 浏览器 设置 -  Console - Enable custom formatters
console.log('obj', obj) //打印 demo= Ref<1>
```



#### 2、toRef & toRefs

```typescript
// 取出响应式对象中的一个值
const man = reactive({name: "Tom", age: 12})
const age = toRef(man, 'age')

const toRefs = <T extends object>(object: T) => {
  const map = {};
  for (const key in object) {
    map[key] = toRef(object, key);
  }
  return map;
};

const { name, age } = toRefs(man)
```



#### 3、bem架构规范

#### 4.1、父组件给子组件传值

```typescript
import { defineProps, withDefaults } from "vue";

interface DProps {
  title: string;
  num: number[];
}

const props = withDefaults(defineProps<DProps>(), {
  // 给默认值
  title: "zs",
  num: () => [12, 13, 14], // 复杂数据类型使用函数方式
});

```



#### 4.2、子组件给父组件传值

```typescript
<button @click="send">+</button>

interface EmitProps {
    (e: 'on-item-click', num: number, name: string): void;
}
const emit = defineEmits<EmitProps>()

// 等价于 const emit = defineEmits(['on-item-click'])

const send = () => {
    emit('on-item-click', 1, 'aaa')
}
```



#### 4.3、子组件暴露给父组件

```vue
// ---- 子组件 ---- 
<template></template>
<script setup lang="ts">
import { defineExpose } from "vue";
defineExpose({
  name1: "这是暴露的属性",
  open: () => {
      console.log('open')
  }
});
</script>

// ---- 父组件 ----
<template></template>
<script setup lang="ts">
import { ref } from "vue";
  
interface ExposeProps {
  name: string;
  open: Function;
}

const exposeRef = ref<ExposeProps>();
</script>
```

