import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";
import { useState, useEffect } from "react";
import { TaskInterface } from "../../schemas/Task";
import { HomePageProps } from "../../schemas/HomePage";

const HomePage = ({theme, authUser, selectedPetImage}:HomePageProps) => {
    const [uncompletedTasksList, setUncompletedTasksList] = useState<TaskInterface[]>([]);
    const [completedTasksList, setCompletedTasksList] = useState<TaskInterface[]>([]);
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


    const removeTaskFromListOnDeletion = (taskId: string, status: string) => {

        //If it was completed task
        if(status === "done") {
            setCompletedTasksList(prev => prev.filter(task => task._id !== taskId));
            return;
        }
        setUncompletedTasksList(prev => prev.filter(task => task._id !== taskId));
    }

    // Function: Remove task from list handling all scenarios (un/completed, deletion/complete)
    const removeTaskFromListOnCompleted = (completedTask: TaskInterface) => {

        if(!completedTask) return;
        
         /* 
            Get taskId to be used in a condition where tasksList will be updated with every task when
            their id's don´t coincide with the modified task's state (set as completed / deleted) 
        */

        //Remove from uncompleted list
        setUncompletedTasksList(prev => prev.filter(task => task._id !== completedTask._id));
        setCompletedTasksList(prev => prev.concat(completedTask)); //and pass to completed ones  
    }


    // Function: Diminish uncompleted Tasks Count by one
    const diminishUncompletedTasksCount = () => {
        /* 
            Set count of uncompleted tasks to -1 when user complete or delete a task.
        */
       setUncompletedTasksCount(prev => prev-1);
    };

    // Function: Diminish completed Tasks Count by one
    const diminishCompletedTasksCount = () => {
        /* 
            Reduce completed tasks count on completed task deletion.
        */
       setCompletedTasksCount(prev => prev-1);
    }

    // Function: Increase completedTasksCount by one
    const increaseCompletedTasksCount = () => {
        /*
            Set count of completed tasks to +1 when user complete a task.
        */ 
       setCompletedTasksCount(completedTasksCount + 1);
    };

    return (
        <>
            <TasksContainer theme={theme} authUser={authUser} uncompletedTasksList={uncompletedTasksList} completedTasksList={completedTasksList} removeTaskFromListOnDeletion={removeTaskFromListOnDeletion} removeTaskFromListOnCompleted={removeTaskFromListOnCompleted} diminishUncompletedTasksCount={diminishUncompletedTasksCount} diminishCompletedTasksCount={diminishCompletedTasksCount} increaseCompletedTasksCount={increaseCompletedTasksCount}/>
            <PetContainer authUser={authUser} theme={theme} uncompletedTasksCount={uncompletedTasksCount} completedTasksCount={completedTasksCount} selectedPetImage={selectedPetImage}/>
        </>
    );
}

export default HomePage;