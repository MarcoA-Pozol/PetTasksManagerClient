import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";
import { useState, useEffect } from "react";

interface Task {
    _id: string;
    name: string;
    status: "to-do" | "done";
}

interface HomePageProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean |  null>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
    authUser:any;
}

const HomePage = ({theme, authUser}:HomePageProps) => {
    const [uncompletedTasksList, setUncompletedTasksList] = useState<Task[]>([]);
    const [completedTasksList, setCompletedTasksList] = useState<Task[]>([]);
    const [uncompletedTasksCount, setUncompletedTasksCount] = useState<number>(0);
    const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);

    // Function: Fetch user's tasks
    const fetchTasks = async () => {
        /* 
            Get every user's tasks and save them in a list of tasks.
            Tasks are obtained from the json object accessing to json.tasks property.
            Task object include keys like _id, name and isCompleted. 
        */
        if (!authUser || !authUser._id) return;
        try {
            const response = await fetch(`http://localhost:5000/tasks/search?userId=${authUser._id}`);
            if (response.ok) {
                const data = await response.json();
                setCompletedTasksList(data.tasks.filter((tasks: any) => tasks.isCompleted === true));
                setUncompletedTasksList(data.tasks.filter((tasks: any) => tasks.isCompleted === false));
                setCompletedTasksCount(data.completedCount);
                setUncompletedTasksCount(data.uncompletedCount);
                console.log(data);
            } else {
                setCompletedTasksList([]);
                setUncompletedTasksList([]);
                setCompletedTasksCount(0);
                setUncompletedTasksCount(0);
            }
        } catch (err) {
            console.error("Error during fetching tasks for this user:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [authUser]);

    // Function: Remove tasks from list of tasks
    const removeTaskFromList = (taskId: string) => {
        
        //Get completed task
       const completedTask = uncompletedTasksList.find(task => task._id === taskId) as Task;
       
       /* 
            Get taskId to be used in a condition where tasksList will be updated with every task when
            their id's don´t coincide with the modified task's state (set as completed / deleted) 
        */
       setUncompletedTasksList(prev => prev.filter(task => task._id !== taskId));
       
       //Add completed task to completed list
        setCompletedTasksList(completedTasksList.concat(completedTask));
    };

    // Function: Diminish uncompletedTasksCount by one
    const diminishUncompletedTasksCount = () => {
        /* 
            Set count of uncompleted tasks to -1 when user complete or delete a task.
        */
       setUncompletedTasksCount(uncompletedTasksCount -1);
    };

    // Function: Increase completedTasksCount by one
    const increaseCompletedTasksCount = () => {
        /*
            Set count of completed tasks to +1 when user complete a task.
        */ 
       setCompletedTasksCount(completedTasksCount + 1);
    };

    return (
        <>
            <TasksContainer theme={theme} authUser={authUser} uncompletedTasksList={uncompletedTasksList} completedTasksList={completedTasksList} removeTaskFromList={removeTaskFromList} diminishUncompletedTasksCount={diminishUncompletedTasksCount} increaseCompletedTasksCount={increaseCompletedTasksCount}/>
            <PetContainer authUser={authUser} theme={theme} uncompletedTasksCount={uncompletedTasksCount} completedTasksCount={completedTasksCount}/>
        </>
    );
}

export default HomePage;