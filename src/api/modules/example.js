import getApis from "../lib";

const apis = getApis({
    getSth: {
        url: '/gzqApi/cp/portal/notice',
        method: 'GET'
    }
});
export default apis;