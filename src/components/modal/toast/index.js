import Toast from "./comp";
import { buildCompFunc } from '@/utils';

/**
 * 提示
 * @param {string} content 提示内容
 * @param {number} timespan 停留时间，默认1500
 */
function transProps(content, timespan) {
    return { props: { content, timespan } };
}

export default buildCompFunc(Toast, transProps);