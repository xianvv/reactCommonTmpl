import { resGettersEnum } from '@/config/fetch';
import { toUrlParam } from '@/utils';

const defaultOption = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
};

function myFetch(data, { url, bodyTrans, resGetter, ...opt } = {}) {
    return new Promise((resolve, reject) => {
        const option = { ...defaultOption, ...opt };
        if (['GET', 'HEAD'].indexOf(option.method) > -1) {
            url = `${url}?${toUrlParam(data)}`;
        } else {
            option.body = (bodyTrans || JSON.stringify)(data);
        }
        fetch(url, option).then(res => {
            if (!res.ok) {
                reject({ msg: res.statusText, data: res });
            } else {
                resolve(res[resGetter || resGettersEnum.JSON]());
            }
        }).catch(err => reject({ msg: err.message, data: err }));
    });
}
export default myFetch;