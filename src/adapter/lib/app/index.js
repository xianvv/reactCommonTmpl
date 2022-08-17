const bridge = require('./myBridge');

module.exports = {
    login: args => {
        // 登录
        bridge.login(args);
        console.log('app登录');
    }
};