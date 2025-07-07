export interface TaskInterface {
    _id: string;
    name: string;
    status: "to-do" | "done";
};

export type TaskCardProps = {
    taskId: string;
    title: string;
    status: 'to-do' | 'done';
    themeMode: string;
    onComplete: () => void;
    onDelete: () => void;
};

export interface TaskCreationInterface {
    name: string;
    status: "to-do"  | "done";
}

export interface CreateTaskPageProps {
    userId: string;
    uncompletedTasksList: TaskInterface[];
    increaseUncompletedTasksCount: () => void;
    addTaskToUncompletedTasksList: (task: TaskInterface) => void;
}

export interface TasksContainerProps {
    theme: string;
    authUser: any;
    completedTasksList: TaskInterface[];
    uncompletedTasksList: TaskInterface[];
    removeTaskFromListOnCompleted: (completedTask: TaskInterface) => void;
    removeTaskFromListOnDeletion: (taskId: string, status: string) => void;
    diminishUncompletedTasksCount: () => void;
    diminishCompletedTasksCount: () => void;
    increaseCompletedTasksCount: () => void;
}

export interface TaskInterfaceTwo {
    name: string;
    status: "to-do" | "done";
    timeToResetInSeconds: number;
    userId: string;
}

export interface TaskCreationFormularyProps{
    userId: string;
    uncompletedTasksList: TaskInterface[];
    increaseUncompletedTasksCount: () => void;
    addTaskToUncompletedTasksList: (task: TaskInterface) => void;
}
