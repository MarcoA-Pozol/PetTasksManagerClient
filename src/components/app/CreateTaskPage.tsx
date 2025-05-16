import TaskCreationFormulary from "./TaskCreationFormulary";

interface Task {
    name: string;
    status: "pending" | "in-progress" | "done";
}

interface CreateTaskPageProps {
    onData: (task: Task) => void;
    userId: number;
}

const CreateTaskPage = ({onData, userId}: CreateTaskPageProps) => {

    const handleDataFromChild = (newTask: Task) => {
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