/**
 * 加载HTML标签
 * @param {string} tag HTML标签
 * @param {object}} attrs 属性
 * @returns promise对象，resolve时表示加载完成
 */
function load(tag, attrs = {}) {
  return new Promise((resolve) => {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      node[k] = v;
    });
    node.onload = resolve;
    document.body.append(node);
  });
}

/**
 * 加载js脚本资源
 * @param {string} src js资源链接
 * @returns promise对象
 */
export function loadjs(src) {
  return load('script', { src });
}

/**
 * 加载css资源
 * @param {string} href css资源链接
 * @returns promise对象
 */
export function loadcss(href) {
  return load('link', { rel: 'stylesheet', type: 'text/css', href });
}
