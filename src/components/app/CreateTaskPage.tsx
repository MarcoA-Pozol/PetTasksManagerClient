import TaskCreationFormulary from "./TaskCreationFormulary";
import { TaskCreationInterface, CreateTaskPageProps } from "../../schemas/Task";

const CreateTaskPage = ({onData, userId}: CreateTaskPageProps) => {

    const handleDataFromChild = (newTask: TaskCreationInterface) => {
        //Return created task to parent
        onData(newTask);
    }

    return (
        <>
            <TaskCreationFormulary onData={handleDataFromChild} userId={userId}/>
        </>
    );
}

export default CreateTaskPage;