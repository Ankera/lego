interface Options {
  scheduler?: Function;
}

let activeEffect: Function;
export const effect = (fn: Function, options: Options) => {
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

export const tarck = (target: object, key: any) => {
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

export const trigger = (target: object, key: any) => {
  const depsMap = targetMap.get(target);
  const deps = depsMap.get(key);

  deps.forEach((effect: any) => {
    if (effect?.options?.scheduler) {
      effect?.options?.scheduler();
    } else {
      effect();
    }
  });
};
