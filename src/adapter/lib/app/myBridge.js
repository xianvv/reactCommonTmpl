const { isType } = require('@/utils');
const nativeBridgeName = 'dd_native';

// 注入的原生对象
const nativeBridge = window[nativeBridgeName] || {
    postMessage(command, args, successCbName, failCbName) {
        console.log(command, args, failCbName);
        setTimeout(() => {
            window[successCbName]('成功了');
        }, 1000);
    }
};

// 回调方法名称前缀
const [cbPrefixSuccess, cbPrefixFail] = ["onSuccess", "onFail"];
let index = 0;
// 生成回调函数名称
function getCallbackNames(resolve, reject) {
    const [success, fail] = [
        [nativeBridgeName, cbPrefixSuccess, index].join('_'),
        [nativeBridgeName, cbPrefixFail, index].join('_')
    ];
    index++;
    function removeCallbacks() {
        Reflect.deleteProperty(window, success);
        Reflect.deleteProperty(window, fail);
    }
    window[success] = function (data) {
        removeCallbacks();
        resolve(data);
    };
    window[fail] = function (err) {
        removeCallbacks();
        reject(err);
    };
    return [success, fail];
}

// 无兼容问题，调用时bridge('login','sth')
function bridge(command, args) {
    return new Promise((resolve, reject) => {
        const params = !args || isType(args, 'string')
            ? args : JSON.stringify(args);
        const [success, fail] = getCallbackNames(resolve, reject);
        nativeBridge.postMessage(command, params, success, fail);
    });
}

// Proxy有兼容问题，但是调用起来更舒服，可以bridge.login()
const bridgeProxy = new Proxy({}, {
    get(t, p) {
        return args => bridge(p, args);
    }
});
module.exports = bridgeProxy;