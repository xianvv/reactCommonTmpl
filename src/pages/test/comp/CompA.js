import {useGlobalUserState as useGlobalState} from "@/store";

const CompA = () => {
    const [globalState, setGlobalState] = useGlobalState();
    return (
        <div>
            CompA:
            <div>name:{globalState.name}</div>
            <div>age:{globalState.age}</div>
            <button onClick={() => setGlobalState({ age: globalState.age + 1 })}>age+1</button>
        </div>
    );
};
export default CompA;