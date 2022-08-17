import Debug from 'debug';

// 日志过滤规则
localStorage.debug = 'page:*';

/**
 * 获取日志打印方法，与console.log相比，可以通过localStorage.debug灵活过滤输出的内容
 * @param {string} namespace 命名空间
 * @param {string} key 关键字
 * @returns log方法
 */
function getMyDebug(namespace = 'default', key = '') {
  return Debug(`${namespace}:${key}`);
}

export function getPageLogger(pageName) {
  return getMyDebug('page', pageName);
}

export function getCompLogger(name) {
  return getMyDebug('comp', name);
}
