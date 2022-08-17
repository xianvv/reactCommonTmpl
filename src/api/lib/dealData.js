/**
 * 通用业务逻辑处理
 * @param {object} data 接口返回数据
 * @param {function} resolve 成功回调
 * @param {function} reject 失败回调
 */
function dealData(data, resolve, reject) {
    if (data.status === '1') {
        resolve(data);
    } else {
        reject({ msg: data.msg, data });
    }
}
export default dealData;