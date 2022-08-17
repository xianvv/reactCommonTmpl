import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

export function buildCompFunc(comp, transProps) {
    return (...args) => {
        const { props, parent = document.body } =
            transProps && transProps(...args) || args[0];
        let container = document.createElement('div');
        parent.appendChild(container);
        const instance = createRoot(container);
        return new Promise((resolve, reject) => {
            const vNode = createElement(comp, {
                ...props,
                resolve, reject,
                unmount: () => {
                    instance.unmount();
                    parent.removeChild(container);
                }
            });
            instance.render(vNode);
        });
    };
}