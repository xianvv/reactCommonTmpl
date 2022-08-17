import { promiseWrapper, judgeType } from '@/utils';
import dealData from './dealData';
import myFetch from './myFetch';

function request(data, opt) {
    return new Promise((resolve, reject) => {
        myFetch(data, opt)
            .then(res => dealData(res, resolve, reject))
            .catch(reject);
    });
}

const pwRequest = promiseWrapper(request);

function createApi({
    data: defaultData,
    ...option
}) {
    return (params, configFromOuter) => {
        let data;
        const typeJudger = judgeType(params);
        if (typeJudger.isArray()) {
            data = [...defaultData, ...params];
        } else if (typeJudger.isString()) {
            // todo 没想好，可能有问题
            data = defaultData && defaultData.length ? defaultData + params : params;
        } else {
            data = {
                ...defaultData,
                ...params,
            };
        }
        const opt = {
            ...option,
            ...configFromOuter,
        };
        return pwRequest(data, opt);
    };
}
/**
 * 根据配置生成接口代理对象
 * @param {object} configs 接口配置
 * @returns 接口代理对象
 */
export default function getApis(configs = {}) {
    const list = [];
    const max = 10;
    const apis = {};
    return new Proxy(configs, {
        get(target, key) {
            if (!apis[key]) {
                apis[key] = createApi(target[key]);
                list.push(key);
            }
            if (list.length === max) {
                Reflect.deleteProperty(apis, list.shift());
            }
            return apis[key];
        },
    });
}
