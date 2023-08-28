import { tarck, trigger } from "./effect.js";
const isObject = (obj) => obj !== null && typeof obj === "object";
export const reactive = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
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
