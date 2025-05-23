import { useState, useEffect, useRef } from "react";
import "../../styles/app/appView.css";
import { Navigate, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import CreateTaskPage from "./CreateTaskPage";
import LeftMenu from "./LeftMenu";
import { TaskCreationInterface } from "../../schemas/Task";
import { TaskInterface } from "../../schemas/Task";
// Pet images

//load all from dir (as json objects) 
const petImages = import.meta.glob('../../assets/pet/*.png', {eager: true}) as Record<string, {default: string}>;

//where 'default' is type string json attribute containing image path (print petImages in console if hard to understand)
const petImagesPaths = Object.values(petImages).map(image => image.default); 


const AppView = () => {
    const [theme, setTheme] = useState("light");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const location = useLocation();
    const [authUser, setAuthUser] = useState<any>(null);
    const [displayedPage, setDisplayedPage] = useState("home");
    // Tasks
    const [uncompletedTasksList, setUncompletedTasksList] = useState<TaskInterface[]>([]);
    const [completedTasksList, setCompletedTasksList] = useState<TaskInterface[]>([]);
    const [uncompletedTasksCount, setUncompletedTasksCount] = useState<number>(0);
    const [completedTasksCount, setCompletedTasksCount] = useState<number>(0);
    const hasFetchedTasks = useRef(false); // Control fetching cards to only occur one time on component rendering
    

    // Pick one random pet image
    const randomImageIndex = Math.floor(Math.random() * petImagesPaths.length);
    const selectedPetImage = useRef(petImagesPaths[randomImageIndex]);

    const handleDataFromChild = (data: any) => {
        const createdTask: TaskCreationInterface = data;
        console.log("Data received from child component on app view parent one -> created task: ", createdTask);
    }

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

    // Don't render anything until auth status is known
    if (isAuthenticated === null) return null;
    
    // Redirect if user is not authenticated and trying to access app view
    if (!isAuthenticated && location.pathname !== "/auth") {
        return <Navigate to="/auth" />;
    }

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
            <div className={`app-container ${theme}`}>
                <LeftMenu theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setDisplayedPage={setDisplayedPage}/>
                <div className="content-container">
                    {displayedPage === "home" && <HomePage theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} authUser={authUser} setIsAuthenticated={setIsAuthenticated} setDisplayedPage={setDisplayedPage} selectedPetImage={selectedPetImage.current} completedTasksList={completedTasksList} uncompletedTasksList={uncompletedTasksList}  completedTasksCount={completedTasksCount} uncompletedTasksCount={uncompletedTasksCount} removeTaskFromListOnCompleted={removeTaskFromListOnCompleted} removeTaskFromListOnDeletion={removeTaskFromListOnDeletion} diminishUncompletedTasksCount={diminishUncompletedTasksCount} diminishCompletedTasksCount={diminishCompletedTasksCount} increaseCompletedTasksCount={increaseCompletedTasksCount}/>}
                    {displayedPage === "create" && <CreateTaskPage onData={handleDataFromChild} userId={authUser?._id}/>}
                </div>
            </div>
        </>
    );
}

export default AppView;