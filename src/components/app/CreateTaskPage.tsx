import TaskCreationFormulary from "./TaskCreationFormulary";
import { TaskCreationInterface, CreateTaskPageProps } from "../../schemas/Task";

const CreateTaskPage = ({onData, userId, increaseUncompletedTasksCount, uncompletedTasksList, addTaskToUncompletedTasksList}: CreateTaskPageProps) => {

    const handleDataFromChild = (newTask: TaskCreationInterface) => {
        //Return created task to parent
        onData(newTask);
    }

    return (
        <>
            <TaskCreationFormulary onData={handleDataFromChild} userId={userId} uncompletedTasksList={uncompletedTasksList} increaseUncompletedTasksCount={increaseUncompletedTasksCount} addTaskToUncompletedTasksList={addTaskToUncompletedTasksList}/>
        </>
    );
}

export default CreateTaskPage;