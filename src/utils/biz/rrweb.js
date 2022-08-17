import * as rrweb from 'rrweb';
import { getCompLogger } from '../basic';

const logger = getCompLogger('rrweb');
let events = [[]];
let stopFlag = true;
let saveFunc;
function trySave() {
    if (saveFunc && events.length > 0) {
        saveFunc(events.splice(0, events.length));
    }
    events.unshift([]);
}
const getWebRecorder = () => {
    if (!getWebRecorder.inited) {
        getWebRecorder.inited = true;
        rrweb.record({
            /**
             * 事件触发
             * @param {object} event 事件对象
             * @param {boolean} isCheckout 是否重新创建了快照
             */
            emit: (event, isCheckout) => {
                if (stopFlag) {
                    return;
                }
                if (isCheckout) {
                    logger("ischeckout");
                    trySave();
                }
                // 用任意方式存储 event
                events[0].push(event);
                logger(event);
            },
            checkoutEveryNth: 20, // 每 200 个 event 重新制作快照
        });
    }
    return {
        start: () => stopFlag = false,
        stop: () => {
            stopFlag = true;
            trySave();
        },
        setSave: func => saveFunc = func
    };
};

export const webRecorder = getWebRecorder();