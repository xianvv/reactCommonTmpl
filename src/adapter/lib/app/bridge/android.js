// 获取安卓的bridge对象
module.exports = function getBridge() {
    return new Promise(resolve => {
        if (window.WebViewJavascriptBridge) {
            resolve(window.WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                resolve(window.WebViewJavascriptBridge);
            }, false);
        }
    });
}