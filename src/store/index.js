import createGlobalState from './globalStore';

const useGlobalState = createGlobalState({
    name: 'zs',
    age: 3
});
export default useGlobalState;