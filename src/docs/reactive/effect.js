let activeEffect;
export const effect = (fn, options) => {
    const _effect = () => {
        activeEffect = _effect;
        const res = fn();
        return res;
    };
    _effect.options = options;
    _effect();
    return _effect;
};
const targetMap = new WeakMap();
export const tarck = (target, key) => {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
        depsMap.set(key, deps);
    }
    deps.add(activeEffect);
};
export const trigger = (target, key) => {
    const depsMap = targetMap.get(target);
    const deps = depsMap.get(key);
    deps.forEach((effect) => {
        var _a, _b;
        if ((_a = effect === null || effect === void 0 ? void 0 : effect.options) === null || _a === void 0 ? void 0 : _a.scheduler) {
            (_b = effect === null || effect === void 0 ? void 0 : effect.options) === null || _b === void 0 ? void 0 : _b.scheduler();
        }
        else {
            effect();
        }
    });
};
