const { ua } = require('@/utils');

const androidOrIos = ua()[1];
const getBridge = require(`./${androidOrIos}`)

// bridge操作类型 init send registerHandler callHandler _fetchQueue _handleMesasageFromNative
const bridgeCommandTypeEnum = {
    // 调用
    CALL: 'call',
    // 注册
    REGIST: 'regist'
};
async function getBridgeProxy() {
    if (!getBridgeProxy.inited) {
        getBridgeProxy.inited = true;
        const _bridge = await getBridge();
        getBridgeProxy.instance = new Proxy({}, {
            get(t, p) {
                if (p.startsWith(bridgeCommandTypeEnum.CALL)) {
                    const command = p.substring(bridgeCommandTypeEnum.CALL.length + 1);
                    return param => new Promise(resolve =>
                        _bridge.callHandler(command, param || null,
                            (...args) => resolve(args)));
                }
                if (p.startsWith(bridgeCommandTypeEnum.REGIST)) {
                    const command = p.substring(bridgeCommandTypeEnum.REGIST.length + 1);
                    return () => new Promise(resolve =>
                        _bridge.registerHandler(command,
                            (...args) => resolve(args)));
                }
                return _bridge[p];
            }
        });
    }
    return getBridgeProxy.instance;
}
module.exports = getBridgeProxy;