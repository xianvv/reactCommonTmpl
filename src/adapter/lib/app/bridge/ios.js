// 获取ios的bridge对象
module.exports = function getBridge() {
    return new Promise(resolve => {
        if (window.WebViewJavascriptBridge) {
            resolve(window.WebViewJavascriptBridge);
        } else if (window.WVJBCallbacks) {
            window.WVJBCallbacks.push(resolve);
        } else {
            window.WVJBCallbacks = [resolve];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
    });
}