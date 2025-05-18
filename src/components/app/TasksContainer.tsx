import TaskCard from "./TaskCard";

interface Task {
    _id: string;
    name: string;
    status: "pending" | "in-progress" | "done";
}

interface TasksContainerProps {
    theme: string;
    authUser: any;
    completedTasksList: Task[];
    uncompletedTasksList: Task[];
    removeTaskFromList: (taskId: string) => void;
    diminishUncompletedTasksCount: () => void;
    increaseCompletedTasksCount: () => void;
}

const TasksContainer = ({theme, completedTasksList, uncompletedTasksList, removeTaskFromList, diminishUncompletedTasksCount, increaseCompletedTasksCount}:TasksContainerProps) => {

    return (
        <div className="middle-content">
            {uncompletedTasksList.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                uncompletedTasksList.map((task) => (
                    <TaskCard
                        taskId={task._id}
                        title={task.name}
                        status="pending"
                        themeMode={theme}
                        onComplete={() => {removeTaskFromList(task._id); diminishUncompletedTasksCount(); increaseCompletedTasksCount();}}
                        onDelete={() => {removeTaskFromList(task._id); diminishUncompletedTasksCount();}}
                        //react needs a key for each element when in a list for easier/better rendering (in this way it know what element has to removed, updated, re-rendered, etc).
                        key={task._id} 
                    />
                ))
            )}   

            {completedTasksList.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                completedTasksList.map((task) => (
                    <TaskCard
                        taskId={task._id}
                        title={task.name}
                        status="done"
                        themeMode={theme}
                        onComplete={() => {removeTaskFromList(task._id); diminishUncompletedTasksCount(); increaseCompletedTasksCount();}}
                        onDelete={() => {removeTaskFromList(task._id); diminishUncompletedTasksCount();}}
                        //react needs a key for each element when in a list for easier/better rendering (in this way it know what element has to removed, updated, re-rendered, etc).
                        key={task._id} 
                    />
                ))
            )}     
        </div>
    );
}

export default TasksContainer;