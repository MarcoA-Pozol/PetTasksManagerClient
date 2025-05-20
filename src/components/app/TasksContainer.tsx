import TaskCard from "./TaskCard";
import { TasksContainerProps } from "../../schemas/Task";

const TasksContainer = ({theme, completedTasksList, uncompletedTasksList, removeTaskFromListOnCompleted, removeTaskFromListOnDeletion, diminishUncompletedTasksCount, diminishCompletedTasksCount, increaseCompletedTasksCount}:TasksContainerProps) => {
    return (
        <div className="middle-content">
            <div className="uncompleted-tasks-container">
                <span id="separator-to-do">-- To do --</span>
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

            <div className="completed-tasks-container">
                <span id="separator-done">-- Done --</span>
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