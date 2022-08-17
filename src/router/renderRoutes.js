import { Suspense, lazy } from 'react';
import { BrowserRouter, HashRouter, useRoutes } from 'react-router-dom';

function getRoutes(routes) {
    return routes.map(({
        name, path, component, children,
    }) => {
        const Comp = lazy(component);
        const item = {
            name,
            path,
            element: (
                <Suspense fallback={
                    <div>加载中。。。</div>
                }>
                    <Comp />
                </Suspense>
            ),
        };
        if (children) {
            item.children = getRoutes(children);
        }
        return item;
    });
}

export default function renderRoutes({ mode = 'hash', routes = [] }) {
    const Router = mode === 'hash' ? HashRouter : BrowserRouter;
    const Routes = () => useRoutes(getRoutes(routes));
    return (
        <Router>
            <Routes />
        </Router>
    );
}
