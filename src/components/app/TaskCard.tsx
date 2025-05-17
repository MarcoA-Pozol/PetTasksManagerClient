import '../../styles/app/taskCard.css';

type TaskCardProps = {
    taskId: string;
    title: string;
    status: 'pending' | 'in-progress' | 'done';
    themeMode: string;
};
  
export default function TaskCard({ title, status, themeMode, taskId }: TaskCardProps) {
    const setTaskAsCompleted = async () => {
        try {
            const response = await fetch(`http://localhost:5000/tasks?taskId=${taskId}`, {
                method: 'PATCH'
            });
            if (response.ok) {
                console.log("Task set as completed");
            } else {
                console.log("Error during seting task as completed.");
            }
        } catch (err) {
            console.error("Error during fetching tasks for this user:", err);
        }
    }

    return (
        <div className={`task-card ${status} ${themeMode}`}>
            <h3 className="task-title">{title}</h3>
            <button onClick={setTaskAsCompleted} className="complete-btn">✔</button>
        </div>
    );
};
    