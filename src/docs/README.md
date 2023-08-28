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
