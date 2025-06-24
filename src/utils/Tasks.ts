import { TaskInterface } from "../schemas/Task";
import api from "../axios/Api";

interface fetchUserTasksProps {
    authUser: any;
    setCompletedTasksList: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
    setUncompletedTasksList: React.Dispatch<React.SetStateAction<TaskInterface[]>>;
    setCompletedTasksCount: React.Dispatch<React.SetStateAction<number>>;
    setUncompletedTasksCount: React.Dispatch<React.SetStateAction<number>>;
}
export const fetchUserTasks = async ({authUser, setCompletedTasksList, setUncompletedTasksList, setCompletedTasksCount, setUncompletedTasksCount}:fetchUserTasksProps) => {
    
    await api.get(`http://localhost:5000/tasks/search?userId=${authUser.id}`)
    .then((res: any) => {
        setCompletedTasksList(res.data.tasks.filter((tasks: any) => tasks.isCompleted === true));
        setUncompletedTasksList(res.data.tasks.filter((tasks: any) => tasks.isCompleted === false));
        setCompletedTasksCount(res.data.completedCount);
        setUncompletedTasksCount(res.data.uncompletedCount);
        console.log("Tasks list: ", res);
    })
    .catch(() => {
        setCompletedTasksList([]);
        setUncompletedTasksList([]);
        setCompletedTasksCount(0);
        setUncompletedTasksCount(0);
    });
 }

export const addTaskToUncompletedTasksList = (task: TaskInterface, setUncompletedTasksList: React.Dispatch<React.SetStateAction<TaskInterface[]>>) => {
    setUncompletedTasksList(prev => prev.concat({ _id: task._id, name: task.name, status: "to-do" }));
}