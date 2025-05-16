import "../../styles/app/taskCreationFormulary.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";


interface Task {
    name: string;
    status: "pending" | "in-progress" | "done";
    userId: number;
}

interface TaskCreationFormularyProps{
    onData: (task: Task) => void;
    userId: number;
}

const TaskCreationFormulary = ({onData, userId}: TaskCreationFormularyProps) => {
    
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [repeat, setRepeat] = useState("");

    //Create new task on form submision
    const handleFormSubmision = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();

        //Create task
        const newTask: Task  = {name: title, status: "pending", userId};

        //Update user tasks in server
        const response = await fetch('http://localhost:5000/tasks/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTask),
            credentials: 'include'
        });

        console.log("Task created on server: ", await response.json());

        //Return data to parent
        onData(newTask);
    };

    return (
        <>
            <form className={`create-task-form`} onSubmit={handleFormSubmision}>
                <h2>{t("Create a Task")}</h2>
                <input type="text" placeholder={t("Title")} value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" placeholder={t("Description")} value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <input type="text" placeholder={t("Deadline")}  value={deadline} onChange={(e) => setDeadline(e.target.value)}></input>
                <input type="text" placeholder={t("Repeat")}  value={repeat} onChange={(e) => setRepeat(e.target.value)}></input>
                <button type="submit">{t("Create")}</button>
            </form>
        </>
    );
}

export default TaskCreationFormulary;