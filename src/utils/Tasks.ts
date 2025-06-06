import { TaskInterface } from "../schemas/Task";

interface fetchUserTasksProps {
    authUser: any;
    setCompletedTasksList: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
    setUncompletedTasksList: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
    setCompletedTasksCount: React.Dispatch<React.SetStateAction<number>>;
    setUncompletedTasksCount: React.Dispatch<React.SetStateAction<number>>;
}
export const fetchUserTasks = async ({authUser, setCompletedTasksList, setUncompletedTasksList, setCompletedTasksCount, setUncompletedTasksCount}:fetchUserTasksProps) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/search?userId=${authUser._id}`);
        if (response.ok) {
            const data = await response.json();
            setCompletedTasksList(data.tasks.filter((tasks: any) => tasks.isCompleted === true));
            setUncompletedTasksList(data.tasks.filter((tasks: any) => tasks.isCompleted === false));
            setCompletedTasksCount(data.completedCount);
            setUncompletedTasksCount(data.uncompletedCount);
            console.log("Tasks list:", data);
        } else {
            setCompletedTasksList([]);
            setUncompletedTasksList([]);
            setCompletedTasksCount(0);
            setUncompletedTasksCount(0);
        }
    } catch (err) {
        console.error("Error during fetching tasks for this user:", err);
    };
 }

export const addTaskToUncompletedTasksList = (task: TaskInterface, setUncompletedTasksList: React.Dispatch<React.SetStateAction<TaskInterface[]>>) => {
    setUncompletedTasksList(prev => prev.concat({ _id: task._id, name: task.name, status: "to-do" }));
}