export function findInArray(array: Array<any> | TouchList, callback: Function): any {
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

export function isFunction(func: any): boolean  {
  // $FlowIgnore[method-unbinding]
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

export function isNum(num: any): boolean  {
  return typeof num === 'number' && !isNaN(num);
}

export function int(a: string): number {
  return parseInt(a, 10);
}

export function dontSetMe(props: object, propName: string, componentName: string): Error | undefined {
  if (props.hasOwnProperty(propName)) {
    return new Error(`Invalid prop ${propName} passed to ${componentName} - do not set this, set it on the child.`);
  }
}