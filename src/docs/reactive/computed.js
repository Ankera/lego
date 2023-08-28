import { effect } from "./effect.js";
export const computed = (getter) => {
  let _dirty = true;
  let catchValue;
  const _value = effect(getter, {
    scheduler: () => {
      _dirty = true;
    },
  });
  class ComputedRefImpp {
    get value() {
      if (_dirty) {
        catchValue = _value();
        _dirty = false;
      }
      return catchValue;
    }
  }
  return new ComputedRefImpp();
};
