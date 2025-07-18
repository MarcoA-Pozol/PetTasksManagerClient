import "../../styles/app/taskCreationFormulary.css";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { TaskInterfaceTwo, TaskCreationFormularyProps } from "../../schemas/Task";

import api from "../../axios/Api";


const TaskCreationFormulary = ({userId, increaseUncompletedTasksCount, addTaskToUncompletedTasksList}: TaskCreationFormularyProps) => {

    const { t } = useTranslation();
    
    const [title, setTitle] = useState("");
    const titleElementRef = useRef<HTMLInputElement>(null);

    // Task type: daily, one-use, custom, etc
    const [type, setType] = useState("d");
    const typeElementRef = useRef<HTMLSelectElement>(null);

    const [showAgainIn, setShowAgainIn] = useState(3);
    const [timeFormat, setTimeFormat] = useState("d");

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [showWarningMessage, setShowWarningMessage] = useState(false);
    const [showTaskAlreadyExistsMessage, setShowTaskAlreadyExistsMessage] = useState(false);


    
    useEffect(() => {
        //Place cursor in text area just after load page
        if(titleElementRef.current) titleElementRef.current.focus(); 
    }, []);

    
    useEffect(() => {
        
        // Auto-set task type to 'daily' if 
        if(type == "c" && showAgainIn == 1 && timeFormat == "d") {
            if(typeElementRef.current) {
                setType("d");
                typeElementRef.current.selectedIndex = 0;
                setShowAgainIn(3);
            }
        }
    }, [timeFormat, showAgainIn]);


    const updateShowAgainIn = (e: any) => {
        const input = e.target.value;
        if(input > 0)
            setShowAgainIn(input);
    }


    //Create new task on form submision
    const handleFormSubmision = async (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault();
        
        try {
            if (title!=="") {
                
                //Create task

                // Format time to show again when completed (in seconds) 
                let timeToResetInSeconds;

                if(type == "c") {
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
                }
                const newTask: TaskInterfaceTwo  = {name: title, status: "to-do", type, timeToResetInSeconds, userId};
    
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
                    setShowTaskAlreadyExistsMessage(true);
                    setTimeout(() => {
                        setShowTaskAlreadyExistsMessage(false);
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
                
                <div className="taskTypes__container">
                    <p onClick={() => setType('o')} className={`taskType oneUse ${type === 'o' ? 'selected' : ''}`}>One-Use</p>
                    <p onClick={() => setType('d')} className={`taskType daily ${type === 'd' ? 'selected' : ''}`}>Daily</p>
                    <p onClick={() => setType('c')} className={`taskType custom ${type === 'c' ? 'selected' : ''}`}>Custom</p>
                </div>

                {type=="c" && (
                    <div style={{marginTop:"7px", marginBottom:"7px", alignItems: "center", display:"flex", flexDirection:"column"}}>
                        <label>Show again in</label>
                        <input style={{marginTop:"1px"}} type="number" placeholder={t("Time")} value={showAgainIn} onChange={(e) => updateShowAgainIn(e)} min={1}></input>
                        <select style={{backgroundColor: "white"}} name="time-formats" defaultValue="d" onChange={(e) => setTimeFormat(e.target.value)}>
                            <option value="d">Days</option>
                            <option value="w">Weeks</option>
                            <option value="m">Months</option>
                        </select>
                    </div>
                )}
                
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

                {showTaskAlreadyExistsMessage && (
                <div style={{backgroundColor:"rgb(202, 81, 1)"}} className="temporary-message">
                    {t("Task already exists")}
                </div>
                )}
            </form>

        </>
    );
}

export default TaskCreationFormulary;