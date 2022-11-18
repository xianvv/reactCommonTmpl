import {useGlobalUserState as useGlobalState} from "@/store";

const CompB = () => {
    const [globalState] = useGlobalState();
    return (
        <div>
            CompB:
            <div>name:{globalState.name}</div>
            <div>age:{globalState.age}</div>
        </div>
    );
}
export default CompB;