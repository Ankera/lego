import { effect } from "./effect";

export const computed = (getter: Function) => {
  let _dirty = true;
  let catchValue: any;
  const _value = effect(getter, {
    scheduler: () => {
      _dirty = true
    }
  });

  class ComputedRefImpp {
    get value() {
      if(_dirty){
        catchValue = _value();
        _dirty = false
      }
      return catchValue;
    }
  }

  return new ComputedRefImpp();
};
