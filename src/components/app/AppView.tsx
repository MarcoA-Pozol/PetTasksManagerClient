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
import { checkIsEmailVerified } from "../../utils/EmailVerification";
// Pet images

//load all from dir (as json objects) 
const badPetImages = import.meta.glob('../../assets/pet/bad/*.png', {eager: true}) as Record<string, {default: string}>;
const notBadPetImages = import.meta.glob('../../assets/pet/not_bad/*.png', {eager: true}) as Record<string, {default: string}>;
const goodPetImages = import.meta.glob('../../assets/pet/good/*.png', {eager: true}) as Record<string, {default: string}>;
const perfectPetImages = import.meta.glob('../../assets/pet/perfect/*.png', {eager: true}) as Record<string, {default: string}>;

//where 'default' is type string json attribute containing image path (print petImages in console if hard to understand)
const badPetImagesPaths = Object.values(badPetImages).map(image => image.default); 
const notBadPetImagesPaths = Object.values(notBadPetImages).map(image => image.default);
const goodPetImagesPaths = Object.values(goodPetImages).map(image => image.default);
const perfectPetImagesPaths = Object.values(perfectPetImages).map(image => image.default);

const AppView = () => {
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const root = document.documentElement; 
        root.classList.remove("light", "dark");
        root.classList.add(theme);
    }, [theme]);
    const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(false); 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
    const [authUser, setAuthUser] = useState<any>(null);
    const [displayedPage, setDisplayedPage] = useState("home");
    const completedTasksPercentage = useRef<number>(0);
    const [selectedPetImage, setSelectedPetImage] = useState<string>("");
    // Tasks
    const [uncompletedTasksList, setUncompletedTasksList] = useState<TaskInterface[]>([]);
    const [completedTasksList, setCompletedTasksList] = useState<TaskInterface[]>([]);
    const [uncompletedTasksCount, setUncompletedTasksCount] = useState<number>(0);
    const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
    const hasFetchedTasks = useRef(false); // Control fetching cards to only occur one time on component rendering
    
    // Check if is user's email verified
    useEffect(() => {
        if (!authUser || !authUser._id || hasFetchedTasks.current) return;
        checkIsEmailVerified({setIsEmailVerified});
    }, [authUser?._id])

    // Pick one random pet image
    useEffect(() => {
        /*
            Effect to update pet image only when completion percentage changes
        */
        const randomImageIndex = Math.floor(Math.random() * 3);

        if (completedTasksPercentage.current < 40) {
            setSelectedPetImage(badPetImagesPaths[randomImageIndex]);
        }
        else if (completedTasksPercentage.current < 70 && completedTasksPercentage.current >= 40) {
            setSelectedPetImage(notBadPetImagesPaths[randomImageIndex]);
        }
        else if (completedTasksPercentage.current < 90 && completedTasksPercentage.current >= 70) {
            setSelectedPetImage(goodPetImagesPaths[randomImageIndex]);
        }
        else if (completedTasksPercentage.current >= 90) {
            setSelectedPetImage(perfectPetImagesPaths[randomImageIndex]);
        }
    }, [completedTasksCount, uncompletedTasksCount]);

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

    // Authentication check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/check', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                    const data = await response.json()
                    setAuthUser(data.user)
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error("Authentication error:", err);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Function: Fetch user's tasks
    useEffect(() => {
        /* 
            Get every user's tasks and save them in a list of tasks.
            Tasks are obtained from the json object accessing to json.tasks property.
            Task object include keys like _id, name and isCompleted. 
        */
       if (!authUser || !authUser._id || hasFetchedTasks.current) return;

       hasFetchedTasks.current = true;
       
       const fetchCards = async () => {
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

        fetchCards();
    }, [authUser?._id]); // Wait for authUser._id before fetching cards to avoid double call

    const addTaskToUncompletedTasksList = (task: TaskInterface) => {
        /* 
            Add task to uncompleted tasks list when user creates a new task.
            Task is obtained from the json object accessing to json.tasks property.
            Task object include keys like _id, name and isCompleted. 
        */
       setUncompletedTasksList(prev => prev.concat({ _id: task._id, name: task.name, status: "to-do" }));
       // setUncompletedTasksCount(prev => prev + 1);
    }

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
    
    // Function: Increase to do tasks count by one
    const increaseUncompletedTasksCount = () => {
        /*
            Set count of uncompleted tasks to +1 when user create a task.
        */
       setUncompletedTasksCount(uncompletedTasksCount + 1);
    }

    if (isAuthenticated && !isEmailVerified) return (
        <>
            <EmailVerificationForm setIsEmailVerified={setIsEmailVerified}/>
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
                                addTaskToUncompletedTasksList={addTaskToUncompletedTasksList}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
    
}

export default AppView;