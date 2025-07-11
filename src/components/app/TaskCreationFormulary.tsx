import "../../styles/app/taskCreationFormulary.css";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { TaskInterfaceTwo, TaskCreationFormularyProps } from "../../schemas/Task";

import api from "../../axios/Api";


const TaskCreationFormulary = ({userId, increaseUncompletedTasksCount, addTaskToUncompletedTasksList}: TaskCreationFormularyProps) => {

    const { t } = useTranslation();
    
    const [title, setTitle] = useState("");
    const titleElementRef = useRef<HTMLInputElement>(null);

    const [showAgainIn, setShowAgainIn] = useState(0);
    const showAgainInElementRef = useRef<HTMLInputElement>(null);

    const [timeFormat, setTimeFormat] = useState("d");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showWarningMessage, setShowWarningMessage] = useState(false);
    const [showTaskAlradyExistsMessage, setShowTaskAlraedyExistsMessage] = useState(false);


    
    useEffect(() => {
        //Place cursor in text area just after load page
        if(titleElementRef.current) titleElementRef.current.focus(); 
    }, []);


    //Create new task on form submision
    const handleFormSubmision = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        
        try {
            if (title!=="") {
                
                //Create task

                // Format time to show again when completed (in seconds)
                let timeToResetInSeconds = 60 * 60 * 24;
                switch(timeFormat) {
                    case "h":
                        timeToResetInSeconds = showAgainIn * 60 * 60;
                        break;
                    case "d":
                        timeToResetInSeconds = showAgainIn * 60 * 60 * 24;
                        break;
                    case "w":
                        timeToResetInSeconds = showAgainIn * 60 * 60 * 24 * 7;
                        break;
                    case "m":
                        timeToResetInSeconds = showAgainIn * 60 * 60 * 24 * 7 * 4;
                        break;
                }

                const newTask: TaskInterfaceTwo  = {name: title, status: "to-do", timeToResetInSeconds, userId};
    
                //Update user tasks in server
                await api.post('http://localhost:5000/tasks/', newTask)
                .then((res: any) => {

                    console.log("Task created on server: ", res);
        
                    const task = res.data.request_body;

                    console.log("Task added to uncompleted tasks list: ", task);

                    // Add task to uncompleted tasks list
                    addTaskToUncompletedTasksList(task);

                    // Increase uncompleted tasks count
                    increaseUncompletedTasksCount();
        
                    // Clean form fields after submission
                    setTitle("");
        
                    // Show success message
                    setShowSuccessMessage(true);
        
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 2000);
                })
                .catch(() => {
                    console.error("Failed to create task");
                    setTitle("");
                    setShowTaskAlraedyExistsMessage(true);
                    setTimeout(() => {
                        setShowTaskAlraedyExistsMessage(false);
                    }, 2000);
                });
     
            } else {
                // Show warning message
                setShowWarningMessage(true);
                    
                setTimeout(() => {
                    setShowWarningMessage(false);
                }, 2000);
            }
        } catch (error) {
            // Show error message
            setShowErrorMessage(true);

            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000);
        }

        //Re-place cursor in text area after submiting
        if (titleElementRef.current) titleElementRef.current.focus(); 
    };
    

    return (
        <>
            <form className={`create-task-form`} onSubmit={handleFormSubmision}>
                <h2>{t("Create a Task")}</h2>
                <input type="text" placeholder={t("Title")} ref={titleElementRef} value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input type="number" placeholder={t("Show again in")} ref={showAgainInElementRef} value={showAgainIn} onChange={(e) => setShowAgainIn(e.target.valueAsNumber)}></input>
                <select name="time-formats" onChange={(e) => setTimeFormat(e.target.value)}>
                    <option value="h">Hours</option>
                    <option value="d" selected>Days</option>
                    <option value="w">Weeks</option>
                    <option value="m">Months</option>
                </select>
                <button type="submit">{t("Create")}</button>
                
                {showSuccessMessage && (
                <div style={{backgroundColor:"#4caf50"}} className="temporary-message">
                    {t("Task created")}!
                </div>
                )}

                {showWarningMessage && (
                <div style={{backgroundColor:"#bb6a34"}} className="temporary-message">
                    {t("Fill all fields")}
                </div>
                )}

                {showErrorMessage && (
                <div style={{backgroundColor:"#af4c4c"}} className="temporary-message">
                    {t("Error while creating task")}
                </div>
                )}

                {showTaskAlradyExistsMessage && (
                <div style={{backgroundColor:"rgb(202, 81, 1)"}} className="temporary-message">
                    {t("Task already exists")}
                </div>
                )}
            </form>

        </>
    );
}

export default TaskCreationFormulary;