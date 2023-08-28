
let activeEffect: Function;
export const effect = (fn: Function) => {
    const _effect = () => {
        activeEffect = _effect;

        fn();
    }

    _effect();
}



const targetMap = new WeakMap();

export const tarck = (target: object, key: any) => {
    console.log(1222211)
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map();
        targetMap.set(target, depsMap)
    }

    let deps = depsMap.get(key);
    if(!deps){
        deps = new Set();
        depsMap.set(key, deps)
    }

    deps.add(activeEffect)
}

export const trigger = (target: object, key: any) => {
    const depsMap = targetMap.get(target)
    const deps = depsMap.get(key);

    deps.forEach((fn: Function) => fn());
}