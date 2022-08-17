/**
 * 异步函数转换
 * @param {function} p 返回promise的函数
 * @returns 返回promise的函数，promise只resolve数组，第一项表示错误对象，第二项表示数据
 */
export function promiseWrapper(p) {
  return (...args) =>
    new Promise((resolve) => {
      p(...args)
        .then((res) => resolve([null, res]))
        .catch((err) => resolve([err, null]));
    });
}
