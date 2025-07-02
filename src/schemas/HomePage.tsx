import { TaskInterface } from "./Task";

export interface HomePageProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
    authUser:any;
    selectedPetImage: string;
    petState: string;
    completedTasksList: TaskInterface[];
    uncompletedTasksList: TaskInterface[];
    uncompletedTasksCount: number;
    completedTasksCount: number;
    removeTaskFromListOnCompleted: (completedTask: TaskInterface) => void;
    removeTaskFromListOnDeletion: (taskId: string, status: string) => void;
    diminishUncompletedTasksCount: () => void;
    diminishCompletedTasksCount: () => void;
    increaseCompletedTasksCount: () => void;
    completedTasksPercentage: React.MutableRefObject<number>;
    hideSignOutWindow: boolean;
    setHideSignOutWindow: React.Dispatch<React.SetStateAction<boolean>>;
}