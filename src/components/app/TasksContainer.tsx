import TaskCard from "./TaskCard";

interface Task {
    _id: string;
    name: string;
    status: "pending" | "in-progress" | "done";
}

interface TasksContainerProps {
    theme: string;
    authUser: any;
    tasksList: Task[];
    removeTaskFromList: (taskId: string) => void;
}

const TasksContainer = ({theme, tasksList, removeTaskFromList}:TasksContainerProps) => {

    return (
        <div className="middle-content">
            {tasksList.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                tasksList.map((task) => (
                    <TaskCard
                        taskId={task._id}
                        title={task.name}
                        status="done"
                        themeMode={theme}
                        onComplete={() => removeTaskFromList(task._id)}
                        onDelete={() => removeTaskFromList(task._id)}
                    />
                ))
            )}    
        </div>
    );
}

export default TasksContainer;