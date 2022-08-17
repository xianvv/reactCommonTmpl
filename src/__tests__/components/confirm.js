import { cleanup, render, fireEvent } from "@testing-library/react";
import Confirm from "@/components/modal/confirm/comp";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

describe('确认弹窗', () => {
    it('confrim正常显示', () => {
        const dom = render(<Confirm content='你确定吗' unmount={() => { }}
            resolve={() => { }} />);
        expect(dom.getByText('你确定吗')).toBeTruthy();
    });
    it('confrim正常确定', async () => {
        const unmount = jest.fn();
        const resolve = jest.fn();
        const dom = render(<Confirm content='你确定吗' unmount={unmount}
            resolve={resolve} />);
        fireEvent.click(dom.getByText('确定'));
        expect(unmount).toBeCalledTimes(1);
        expect(resolve).toBeCalledTimes(1);
    });
});