/**
 * 待办管理器
 * @returns todoMgr对象
 *      -add 追加待办任务
 */
export const getTodoMgr = () => {
    const list = [];
    async function execute() {
        if (execute.flag) {
            return;
        }
        execute.flag = true;
        while (list.length) {
            await list.shift()();
        }
        execute.flag = false;
    }
    /**
     * 追加待办任务
     * @param {function} func 任务
     * @param  {...any} args 参数
     */
    function add(func, ...args) {
        list.push(func.bind(null, ...args));
        execute();
    }
    return { add };
}