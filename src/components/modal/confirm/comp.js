import { useStateWrap } from '@/utils';
import './style';

const Confirm = props => {
    const [state, setState] = useStateWrap({ show: true, content: props.content });

    function hide(result) {
        setState({ show: false });
        props.unmount();
        props.resolve(result);
    }

    function onOk() {
        if (!props.check || (props.check && props.check())) {
            hide(true);
        }
    }

    function onCancel() {
        hide(false);
    }
    return (
        state.show && <div className="confirm-wrap">
            <div className="confirm-bd">
                <div className="confirm-hd">确认</div>
                <div className="confirm-content">{state.content}</div>
                <div className="confirm-btns">
                    <div className='btn' onClick={onCancel}>取消</div>
                    <div className='btn' onClick={onOk}>确定</div>
                </div>
            </div>
        </div>
    );
};
export default Confirm;