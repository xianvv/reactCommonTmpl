import { getStorage } from '@/utils';
import { useEffect, useState } from 'react';

const Prefix = 'globalState';
/**
 * 全局state钩子创建
 * @param {object} state 最好别嵌套
 * @param {string} namespace 需要持久化的时候传
 * @returns useGlobalState
 */
function createGlobalState(state = {}, namespace) {
  const storeKey = `${Prefix}_${namespace}`;
  const storage = getStorage(storeKey);
  let globalState = namespace ? Object.assign(state, storage.get()) : state;
  const listners = new Set();

  const setGlobalState = (obj) => {
    globalState = Object.assign({}, globalState, obj);
    if (namespace) {
      storage.set(globalState);
    }
    listners.forEach((listner) => listner());
  };

  const clearGlobalState = () => {
    globalState = {};
    if (namespace) {
      storage.clear();
    }
    listners.forEach((listner) => listner());
  };

  const useGlobalState = () => {
    const [state, setState] = useState(globalState);
    useEffect(() => {
      const listner = () => setState({ ...globalState });
      listners.add(listner);
      return () => listners.delete(listner);
    }, []);
    return [state, setGlobalState, clearGlobalState];
  };

  return useGlobalState;
}

export default createGlobalState;
