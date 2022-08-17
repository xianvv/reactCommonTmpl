// 是否app | android/ios | 是否iPhone X
export function ua() {
    if (!ua.inited) {
        const _ua = window.navigator.userAgent;
        const appOrH5 = _ua.indexOf('dangdang') > -1 ? 'app' : 'h5';
        const androidOrIos = ['Android', 'Adr'].some(str =>
            _ua.indexOf(str) > -1) ? 'android' : 'ios';
        const screenCondition = [[375, 812], [414, 896], [276]];
        const iphonex = screenCondition.some(([w, h]) =>
            (h !== undefined || h === window.screen.height) && w === window.screen.width)
            ? 'iphonex' : 'normal';
        ua.instance = [appOrH5, androidOrIos, iphonex];
        ua.inited = true;
    }
    return ua.instance;
}