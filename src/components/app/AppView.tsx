import { useState, useEffect, useRef } from "react";
import "../../styles/app/appView.css";
import HomePage from "./HomePage";
import CreateTaskPage from "./CreateTaskPage";
import LeftMenu from "./LeftMenu";
import { TaskInterface } from "../../schemas/Task";
import { authInterceptor, emailInterceptor } from "../../axios/Api";
import { checkUserAuthentication } from "../../utils/Authentication";

// Utils
import { pickOneRandomPetImage } from '../../utils/PetImage';
import { fetchUserTasks, addTaskToUncompletedTasksList } from '../../utils/Tasks';



const AppView = () => {

    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const root = document.documentElement; 
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);
    const [authUser, setAuthUser] = useState<any>(null);
    const [displayedPage, setDisplayedPage] = useState("home");
    const completedTasksPercentage = useRef<number>(0);
    const [selectedPetImage, setSelectedPetImage] = useState<string>("");
    const [petState, setPetState] = useState<string>("");

    // Tasks
    const [uncompletedTasksList, setUncompletedTasksList] = useState<TaskInterface[]>([]);
    const [completedTasksList, setCompletedTasksList] = useState<TaskInterface[]>([]);
    const [uncompletedTasksCount, setUncompletedTasksCount] = useState<number>(0);
    const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
    const hasFetchedTasks = useRef(false); // Control fetching cards to only occur one time on component rendering
    

    //Include incerceptors
    authInterceptor();
    emailInterceptor();


    // Authentication check
    useEffect(() => {
        checkUserAuthentication({setAuthUser});
    }, []);

    // Pick one random pet image
    useEffect(() => {
        pickOneRandomPetImage({completedTasksPercentage, setSelectedPetImage, setPetState});
    }, [completedTasksCount, uncompletedTasksCount]);

    // Get user's session theme
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);
    
    // Fetch tasks
    useEffect(() => {
<<<<<<< HEAD
        if (!authUser || !authUser._id || !isEmailVerified || hasFetchedTasks.current) return;
=======
       if (!authUser || !authUser._id || hasFetchedTasks.current) return;

       hasFetchedTasks.current = true;
>>>>>>> 5eed749 (Add email verification interceptor)
        
        hasFetchedTasks.current = true;
        
        fetchUserTasks({authUser, setCompletedTasksList, setUncompletedTasksList, setCompletedTasksCount, setUncompletedTasksCount});
    }, [authUser?._id]); // Fetch only when authUser change or is set first time on login


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


    return (
        <> 
<<<<<<< HEAD
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
                                userId={authUser?._id}
                                uncompletedTasksList={uncompletedTasksList}
                                increaseUncompletedTasksCount={increaseUncompletedTasksCount}
                                addTaskToUncompletedTasksList={(task: TaskInterface) => addTaskToUncompletedTasksList(task, setUncompletedTasksList)}
                            />
                        )}
                    </div>
=======
            <div className={`app-container ${theme}`}>
                <LeftMenu 
                    theme={theme} 
                    setTheme={setTheme} 
                    setDisplayedPage={setDisplayedPage} 
                />
                <div className="content-container">
                    {displayedPage === "home" && (
                        <HomePage 
                            theme={theme}
                            setTheme={setTheme}
                            authUser={authUser}
                            setDisplayedPage={setDisplayedPage}
                            selectedPetImage={selectedPetImage}
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
                            userId={authUser?._id}
                            uncompletedTasksList={uncompletedTasksList}
                            increaseUncompletedTasksCount={increaseUncompletedTasksCount}
                            addTaskToUncompletedTasksList={(task: TaskInterface) => addTaskToUncompletedTasksList(task, setUncompletedTasksList)}
                        />
                    )}
>>>>>>> 5eed749 (Add email verification interceptor)
                </div>
            </div>
        </>
    );
    
}

export default AppView;