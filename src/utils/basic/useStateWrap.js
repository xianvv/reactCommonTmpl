import { useState } from "react";

/**
 * 针对对象类型的状态封装
 * @param {object} initValue 状态初始值
 * @returns [state,setState]
 * @example
 *      const [state,setState] = useState({name:'zs',age:3});
 *      setState({age:4});
 */
export function useStateWrap(initValue) {
    const [state, setState] = useState(initValue);
    function setStateWrap(o) {
        return new Promise(resolve => {
            Object.assign(state, o);
            setState({ ...state });
            resolve();
        });
    }
    return [state, setStateWrap];
}