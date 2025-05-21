import { TaskInterface } from "./Task";

export interface HomePageProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean |  null>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
    authUser:any;
    selectedPetImage: string;
    completedTasksList: TaskInterface[];
    uncompletedTasksList: TaskInterface[];
    uncompletedTasksCount: number;
    completedTasksCount: number;
    removeTaskFromListOnCompleted: (completedTask: TaskInterface) => void;
    removeTaskFromListOnDeletion: (taskId: string, status: string) => void;
    diminishUncompletedTasksCount: () => void;
    diminishCompletedTasksCount: () => void;
    increaseCompletedTasksCount: () => void;
}