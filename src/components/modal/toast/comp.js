import { useEffect, useState } from 'react';
import './style';

const Toast = props => {
    const [state, setState] = useState({ show: false, content: '' });

    useEffect(() => {
        Object.assign(state, { show: true, content: props.content });
        setState({ ...state });
        setTimeout(() => {
            props.unmount();
        }, props.timespan||1500);
    }, []);
    return state.show && <div className="toast-wrap">
        <div className="toast-content"> {state.content}</div>
    </div>;
};
export default Toast;