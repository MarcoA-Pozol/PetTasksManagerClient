import TaskCreationFormulary from "./TaskCreationFormulary";
import { CreateTaskPageProps } from "../../schemas/Task";

const CreateTaskPage = ({userId, increaseUncompletedTasksCount, uncompletedTasksList, addTaskToUncompletedTasksList}: CreateTaskPageProps) => {

    return (
        <>
            <TaskCreationFormulary userId={userId} uncompletedTasksList={uncompletedTasksList} increaseUncompletedTasksCount={increaseUncompletedTasksCount} addTaskToUncompletedTasksList={addTaskToUncompletedTasksList}/>
        </>
    );
}

export default CreateTaskPage;