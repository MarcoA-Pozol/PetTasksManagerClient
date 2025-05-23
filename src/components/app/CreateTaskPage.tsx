import TaskCreationFormulary from "./TaskCreationFormulary";
import { TaskCreationInterface, CreateTaskPageProps } from "../../schemas/Task";

const CreateTaskPage = ({onData, userId, increaseUncompletedTasksCount, uncompletedTasksList, setUncompletedTasksList}: CreateTaskPageProps) => {

    const handleDataFromChild = (newTask: TaskCreationInterface) => {
        //Return created task to parent
        onData(newTask);
    }

    return (
        <>
            <TaskCreationFormulary onData={handleDataFromChild} userId={userId} uncompletedTasksList={uncompletedTasksList} setUncompletedTasksList={setUncompletedTasksList} increaseUncompletedTasksCount={increaseUncompletedTasksCount}/>
        </>
    );
}

export default CreateTaskPage;