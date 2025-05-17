import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

interface Task {
    name: string;
    status: "pending" | "in-progress" | "done";
}

interface TasksContainerProps {
    theme: string;
    authUser: any;
}

const TasksContainer = ({theme, authUser}:TasksContainerProps) => {
    const [tasksList, setTasksList] = useState<Task[]>([]);

    useEffect(() => {
        if (!authUser || !authUser._id) return;
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tasks/search?userId=${authUser._id}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const data = await response.json()
                    setTasksList(data.tasks);
                } else {
                    setTasksList([]);
                }
            } catch (err) {
                console.error("Error during fetching tasks for this user:", err);
            }
        };

        fetchTasks();
    }, [authUser]);

    return (
        <div className="middle-content">
            {tasksList.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                tasksList.map((task) => (
                    <TaskCard
                        title={task.name}
                        status="done"
                        themeMode={theme}
                    />
                ))
            )}    
        </div>
    );
}

export default TasksContainer;