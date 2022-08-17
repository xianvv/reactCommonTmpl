import { judgeType } from './judgeType';

/**
 * 深拷贝，不支持对象里包含函数的情况
 * @param {any} source 来源数据
 * @returns 深拷贝对象
 */
export function deepClone(source) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = (e) => resolve(e.data);
    port2.postMessage(source);
  });
}

/**
 * 深拷贝，支持对象里包含函数
 * @param {any} source 来源数据
 * @returns 深拷贝对象
 */
export function deepAssign(source) {
  let result = source;
  const judger = judgeType(source);
  if (judger.isArray()) {
    result = [];
  } else if (judger.isObject()) {
    result = {};
  } else {
    return result;
  }
  Object.entries(source).forEach(([key, value]) => {
    result[key] = deepAssign(value);
  });
}
