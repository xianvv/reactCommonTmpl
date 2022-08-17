import Confirm from "./comp";
import { buildCompFunc } from '@/utils';

function transProps(content, check) {
    return { props: { content, check } };
}

/**
 * 确认弹窗，点确认返回true，点取消返回false
 * @param {string | ReactNode} content 提示内容
 * @param {function} check 确认时检验函数，可以不传
 * @returns promise
 */
export default buildCompFunc(Confirm, transProps);