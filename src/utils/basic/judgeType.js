export function judgeType(o) {
  const t = Object.prototype.toString.call(o);
  return {
    isString: () => t === '[object String]',
    isObject: () => t === '[object Object]',
    isArray: () => t === '[object Array]',
    isBoolean: () => t === '[object Boolean]',
    isNull: () => t === '[object Null]',
    isUndefined: () => t === '[object Undefined]',
    isNumber: () => t === '[object Number]',
    isSymbol: () => t === '[object Symbol]',
    isFunction: () => t === '[object Function]',
  };
}

/**
 * 判断o的类型是否是types中的一种
 * @param {any} o 目标元素
 * @param  {...string} types 可能的类型
 * @returns true：命中，false：未命中
 * @example isType([],'string','array') // true
 *          isType(1,'string','array') //false
 */
export function isType(o, ...types) {
  const t = Object.prototype.toString.call(o).toLowerCase();
  return types.some((type) => t === `[object ${type.toLowerCase()}]`);
}
