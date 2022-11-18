import createGlobalState from './create';

// 用户信息
export const useGlobalUserState = createGlobalState(
    {
        // userName: '',
        // userImage: '',
        // accountType: '',
        name: 'zs',
        age: 3
    },
    'user',
);
