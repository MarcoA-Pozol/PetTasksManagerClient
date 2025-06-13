import { useState, useEffect, useRef } from "react";
import "../../styles/app/appView.css";
import { Navigate, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import CreateTaskPage from "./CreateTaskPage";
import EmailVerificationForm from "../auth/EmailVerificationForm";
import LeftMenu from "./LeftMenu";
import { TaskCreationInterface } from "../../schemas/Task";
import { TaskInterface } from "../../schemas/Task";
// Utils
import { pickOneRandomPetImage } from '../../utils/PetImage';
import { checkUserAuthentication } from '../../utils/Authentication';
import { fetchUserTasks, addTaskToUncompletedTasksList } from '../../utils/Tasks';



const AppView = () => {

    const location = useLocation();

    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const root = document.documentElement; 
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [authUser, setAuthUser] = useState<any>(null);
    const [displayedPage, setDisplayedPage] = useState("home");
    const completedTasksPercentage = useRef<number>(0);
    const [selectedPetImage, setSelectedPetImage] = useState<string>("");
    const [petState, setPetState] = useState<string>("");

    //Email verified
    const isEmailVerified = location?.state?.isEmailVerified;

    // Tasks
    const [uncompletedTasksList, setUncompletedTasksList] = useState<TaskInterface[]>([]);
    const [completedTasksList, setCompletedTasksList] = useState<TaskInterface[]>([]);
    const [uncompletedTasksCount, setUncompletedTasksCount] = useState<number>(0);
    const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
    const hasFetchedTasks = useRef(false); // Control fetching cards to only occur one time on component rendering
    

    // Authentication check
    useEffect(() => {
        checkUserAuthentication({setIsAuthenticated, setAuthUser});
    }, []);


    // Pick one random pet image
    useEffect(() => {
        pickOneRandomPetImage({completedTasksPercentage, setSelectedPetImage, setPetState});
    }, [completedTasksCount, uncompletedTasksCount]);

    // Handle created task
    const handleDataFromChild = (data: any) => {
        const createdTask: TaskCreationInterface = data;
        console.log("Data received from child component on app view parent one -> created task: ", createdTask);
    }

    // Get user's session theme
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    // Fetch tasks
    useEffect(() => {
       if (!authUser || !authUser._id || !isEmailVerified || hasFetchedTasks.current) return;

       hasFetchedTasks.current = true;
        
       fetchUserTasks({authUser, setCompletedTasksList, setUncompletedTasksList, setCompletedTasksCount, setUncompletedTasksCount});
    }, [authUser?._id]); // Wait for authUser._id before fetching cards to avoid double call



    // Function: Remove task from list on deletion
    const removeTaskFromListOnDeletion = (taskId: string, status: string) => {

        //If it was completed task
        if(status === "done") {
            setCompletedTasksList(prev => prev.filter(task => task._id !== taskId));
            return;
        }
        setUncompletedTasksList(prev => prev.filter(task => task._id !== taskId));
    }

    // Function: Remove task from list on complete
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
    
    // Function: Increase to do tasks count by one
    const increaseUncompletedTasksCount = () => {
        /*
            Set count of uncompleted tasks to +1 when user create a task.
        */
       setUncompletedTasksCount(uncompletedTasksCount + 1);
    }

    // If authenticated, check email is verified
    if (!isEmailVerified) return (
        <>
            <EmailVerificationForm/>
        </>
    );

    return (
        <> 
            {isAuthenticated === null ? (
                <div>Loading...</div> // or a spinner
            ) : !isAuthenticated && location.pathname !== "/auth" ? (
                <Navigate to="/auth" />
            ) : (
                <div className={`app-container ${theme}`}>
                    <LeftMenu 
                        theme={theme} 
                        setTheme={setTheme} 
                        isAuthenticated={isAuthenticated} 
                        setIsAuthenticated={setIsAuthenticated} 
                        setDisplayedPage={setDisplayedPage} 
                    />
                    <div className="content-container">
                        {displayedPage === "home" && (
                            <HomePage 
                                theme={theme}
                                setTheme={setTheme}
                                isAuthenticated={isAuthenticated}
                                authUser={authUser}
                                setIsAuthenticated={setIsAuthenticated}
                                setDisplayedPage={setDisplayedPage}
                                selectedPetImage={selectedPetImage}
                                petState={petState}
                                completedTasksList={completedTasksList}
                                uncompletedTasksList={uncompletedTasksList}
                                completedTasksCount={completedTasksCount}
                                uncompletedTasksCount={uncompletedTasksCount}
                                removeTaskFromListOnCompleted={removeTaskFromListOnCompleted}
                                removeTaskFromListOnDeletion={removeTaskFromListOnDeletion}
                                diminishUncompletedTasksCount={diminishUncompletedTasksCount}
                                diminishCompletedTasksCount={diminishCompletedTasksCount}
                                increaseCompletedTasksCount={increaseCompletedTasksCount}
                                completedTasksPercentage={completedTasksPercentage}
                            />
                        )}
                        {displayedPage === "create" && (
                            <CreateTaskPage 
                                onData={handleDataFromChild} 
                                userId={authUser?._id}
                                uncompletedTasksList={uncompletedTasksList}
                                increaseUncompletedTasksCount={increaseUncompletedTasksCount}
                                addTaskToUncompletedTasksList={(task: TaskInterface) => addTaskToUncompletedTasksList(task, setUncompletedTasksList)}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
    
}

export default AppView;