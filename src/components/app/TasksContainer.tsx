import TaskCard from "./TaskCard";
import { TasksContainerProps } from "../../schemas/Task";
import { useState } from "react";

const TasksContainer = ({theme, completedTasksList, uncompletedTasksList, removeTaskFromListOnCompleted, removeTaskFromListOnDeletion, diminishUncompletedTasksCount, diminishCompletedTasksCount, increaseCompletedTasksCount}:TasksContainerProps) => {
    const [currentExtendedContainer, setCurrentExtendedContainer] = useState("to-do");
    const [uncompletedTskCtnStyle, setUncompletedTskCtnStyle] = useState("etd-tsk-ctn");
    const [completedTskCtnStyle, setCompletedTskCtnStyle] = useState("cps-tsk-ctn");


    // Compress and Extend tasks containers (to-do, done)
    const toggleTaskContainers = (target: 'to-do' | 'done') => {
        
        //Prevent clicking the same container
        if(currentExtendedContainer === target) return;
        
        //Hide no selected container
        setUncompletedTskCtnStyle(target === "to-do" ? "etd-tsk-ctn" : "cps-tsk-ctn");
        setCompletedTskCtnStyle(target === "done" ? "etd-tsk-ctn" : "cps-tsk-ctn");

        //Updates in React occurs after function has been executed!
        setCurrentExtendedContainer(target);
    };

    return (
        <div className="middle-content">
            <div className={`uncompleted-tasks-container ${uncompletedTskCtnStyle}`}>
                <span className="tasks-separator" onClick={() => toggleTaskContainers("to-do")} style={{backgroundColor:"rgb(104, 37, 180)"}}>To do</span>
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
                <span className="tasks-separator" onClick={() => toggleTaskContainers("done")}  style={{backgroundColor:"rgb(11, 151, 11)"}}>Done</span>
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