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