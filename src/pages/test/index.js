import config, { env } from '@/config';
import { useEffect } from 'react';
import api from '@/api/modules/example';
import { getPageLogger, webRecorder } from '@/utils';
import adapter from '@/adapter';
import toast from '@/components/modal/toast';
import confirm from '@/components/modal/confirm';
import CompA from './comp/CompA';
import CompB from './comp/CompB';
import { useGlobalUserState as useGlobalState } from "@/store";
import { useNavigate } from 'react-router-dom';
import './index.scss';

const logger = getPageLogger('test');
console.log(config, env);
export default function Test() {
    const [globalState, setGlobalState] = useGlobalState();
    const navigate = useNavigate();
    const content = <input value={globalState.name} onChange={({ target }) => setGlobalState({ name: target.value })} />;

    useEffect(() => {
        webRecorder.start();
        adapter.login('abc');
        async function fetchData() {
            const [err, res] = await api.getSth({ pageNum: 1, pageRows: 10 });
            logger(err, res);
        }
        fetchData();
        return () => webRecorder.stop();
    }, []);

    async function confirmTest() {
        const r = await confirm(content, () => {
            console.log('777');
            return false;
        });
        console.log(r ? '行' : '不行');
    }
    return (<div className='test'>
        <p>组件：</p>
        <div>
            <button onClick={() => toast('123')}>提示</button>
        </div>
        <div>
            <button onClick={confirmTest}>确认</button>
        </div>
        <p>全局状态：{JSON.stringify(globalState)}</p>
        <CompA />
        <CompB />
        {content}
        <p>录屏：</p>
        <div><button onClick={() => { navigate('/play') }}>play</button></div>
    </div>);
}
