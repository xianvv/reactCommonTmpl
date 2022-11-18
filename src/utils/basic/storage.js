export function getStorage(k) {
  let obj = JSON.parse(localStorage.getItem(k) || '{}');
  return {
    get(p) {
      return p ? obj[p] : obj;
    },
    set(map) {
      Object.assign(obj, map);
      localStorage.setItem(k, JSON.stringify(obj));
    },
    clear() {
      obj = {};
      localStorage.removeItem(k);
    },
  };
}
