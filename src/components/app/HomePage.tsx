import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";
import { useState, useEffect } from "react";

interface Task {
    _id: string;
    name: string;
    status: "pending" | "in-progress" | "done";
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
    const [tasksList, setTasksList] = useState<Task[]>([]);
    // const [tasksList, setTasksList] = useState<Task[]>([]);

    // useEffect(() => {
        // if (!authUser || !authUser._id) return;
        // const fetchTasks = async () => {
            // try {
                // const response = await fetch(`http://localhost:5000/tasks/search?userId=${authUser._id}`, {
                    // method: 'GET'
                // });
                // if (response.ok) {
                    // const data = await response.json()
                    // setTasksList(data.tasks);
                // } else {
                    // setTasksList([]);
                // }
            // } catch (err) {
                // console.error("Error during fetching tasks for this user:", err);
            // }
        // };

        // fetchTasks();
    // }, [authUser]);

    // Fetch user's uncompleted tasks
    const fetchTasks = async () => {
        if (!authUser || !authUser._id) return;
        try {
            const response = await fetch(`http://localhost:5000/tasks/search?userId=${authUser._id}`);
            if (response.ok) {
                const data = await response.json();
                setTasksList(data.tasks);
            } else {
                setTasksList([]);
            }
        } catch (err) {
            console.error("Error during fetching tasks for this user:", err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [authUser]);

    const removeTaskFromList = (taskId: string) => {
        setTasksList(prev => prev.filter(task => task._id !== taskId));
    };

    return (
        <>
            <TasksContainer theme={theme} authUser={authUser} tasksList={tasksList} removeTaskFromList={removeTaskFromList}/>
            <PetContainer authUser={authUser} theme={theme}/>
        </>
    );
}

export default HomePage;