export default [
    {
        path: '/',
        component: () => import('@/pages/home/App'),
        // children: [],
    },
    {
        path: '/test',
        component: () => import('@/pages/test'),
    },
    {
        path: '/play',
        component: () => import('@/pages/play')
    }
];