import { useState, useEffect } from "react";

function createGlobalState(store = {}) {
    let globalStore = store;
    const listners = new Set();

    const setGlobalState = obj => {
        globalStore = Object.assign({}, globalStore, obj);
        listners.forEach(listner => listner());
    };

    const useGlobalState = () => {
        const [state, setState] = useState(globalStore);
        useEffect(() => {
            const listner = () => setState({ ...globalStore });
            listners.add(listner);
            return () => listners.delete(listner);
        }, []);
        return [state, setGlobalState];
    };

    return useGlobalState;
}

export default createGlobalState;