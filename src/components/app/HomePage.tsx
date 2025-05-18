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

    // Function: Fetch user's uncompleted tasks
    const fetchTasks = async () => {
        /* 
            Get every user's uncompleted tasks and save them in a list of tasks.
            Tasks are obtained from the json object accessing to json.tasks property.
            Task object include keys like _id, name and isCompleted. 
        */
        if (!authUser || !authUser._id) return;
        try {
            const response = await fetch(`http://localhost:5000/tasks/search?userId=${authUser._id}`);
            if (response.ok) {
                const data = await response.json();
                setTasksList(data.tasks);
                console.log(data.tasks);
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



    //Fetch user completed tasks counter
    const fetchUserCompletedTasksCounter = async () => {

        if (!authUser || !authUser._id) return;

        try{

            const response = await fetch(`http://localhost:5000/tasks/completed/count?userId=${authUser._id}`);

            if(response.ok){

                const data = await response.json();
                const counter = data.counter;

                console.log("User completed tasks counter fetched: ", counter);
            }
            else {
                console.error("No tasks! User not found or no content, this should be 404/204!");
            }

        } catch(err) {
            console.error("Error while fetching user completed tasks counter", err);
        }
    }

    useEffect(() => {
        fetchUserCompletedTasksCounter();
    }, [authUser]);



    // Function: Remove tasks from list of tasks
    const removeTaskFromList = (taskId: string) => {
        /* 
            Get taskId to be used in a condition where tasksList will be updated with every task when
            their id's don´t coincide with the modified task's state (set as completed / deleted) 
        */
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