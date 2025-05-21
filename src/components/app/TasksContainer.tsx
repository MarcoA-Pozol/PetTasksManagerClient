import TaskCard from "./TaskCard";
import { TasksContainerProps } from "../../schemas/Task";
import { useState } from "react";

const TasksContainer = ({theme, completedTasksList, uncompletedTasksList, removeTaskFromListOnCompleted, removeTaskFromListOnDeletion, diminishUncompletedTasksCount, diminishCompletedTasksCount, increaseCompletedTasksCount}:TasksContainerProps) => {
    const [extendedContainer, setExtendedContainer] = useState("to-do");
    const [uncompletedTskCtnStyle, setUncompletedTskCtnStyle] = useState("etd-tsk-ctn");
    const [completedTskCtnStyle, setCompletedTskCtnStyle] = useState("cps-tsk-ctn");


    // Compress and Extend tasks containers (to-do, done)
    const toggleTaskContainers = () => {
        setExtendedContainer(extendedContainer === "to-do" ? "done" : "to-do");

        if (extendedContainer ===  "to-do") {
            setUncompletedTskCtnStyle("etd-tsk-ctn");
            setCompletedTskCtnStyle("cps-tsk-ctn");
        } 

        if (extendedContainer === "done") {
            setUncompletedTskCtnStyle("cps-tsk-ctn");
            setCompletedTskCtnStyle("etd-tsk-ctn");
        }
    };

    return (
        <div className="middle-content">
            <div className={`uncompleted-tasks-container ${uncompletedTskCtnStyle}`}>
                <span id="separator-to-do" onClick={toggleTaskContainers}>To do</span>
                {uncompletedTasksList.length === 0 ? (
                    <p style={{textAlign:"center", marginTop:"30px"}}>Free of tasks!</p> //If no uncompleted tasks...
                ) : (
                    uncompletedTasksList.map((task) => (
                        <TaskCard
                            taskId={task._id}
                            title={task.name}
                            status="to-do"
                            themeMode={theme}
                            onComplete={() => {removeTaskFromListOnCompleted(task); diminishUncompletedTasksCount(); increaseCompletedTasksCount();}}
                            onDelete={() => {removeTaskFromListOnDeletion(task._id, "to-do"); diminishUncompletedTasksCount();}}
                            key={task._id} //element key for easier rendering (reacts knows what element remove, re-rendered).
                        />
                    ))
                )}   
            </div>

            <div className={`completed-tasks-container ${completedTskCtnStyle}`}>
                <span id="separator-done" onClick={toggleTaskContainers}>Done</span>
                {completedTasksList.length === 0 ? (
                    <p style={{textAlign:"center", marginTop:"30px"}}>Nothing here</p> //If no completed tasks...
                ) : (
                    completedTasksList.map((task) => (
                        <TaskCard
                            taskId={task._id}
                            title={task.name}
                            status="done"
                            themeMode={theme}
                            onComplete={() => {}} //Completed tasks can't be 'completed'!
                            onDelete={() => {removeTaskFromListOnDeletion(task._id, "done"); diminishCompletedTasksCount();}}
                            key={task._id}
                        />
                    ))
                )}     
            </div>

        </div>
    );
}

export default TasksContainer;