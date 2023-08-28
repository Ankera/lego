import { tarck, trigger } from "./effect";

const isObject = (obj: any) => obj !== null && typeof obj === "object";

export const reactive = <T extends object>(target: T): any => {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver) as object;
      tarck(target, key);

      if (isObject(res)) {
        return reactive(res);
      }
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    },
  });
};
