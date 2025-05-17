import '../../styles/app/taskCard.css';

type TaskCardProps = {
    taskId: string;
    title: string;
    status: 'pending' | 'in-progress' | 'done';
    themeMode: string;
    onComplete: () => void;
    onDelete: () => void;
};
  
export default function TaskCard({ title, status, themeMode, taskId, onComplete, onDelete}: TaskCardProps) {
    
    const setTaskAsCompleted = async () => {
        /* Set a task as completed in server */
        try {
            const response = await fetch(`http://localhost:5000/tasks?taskId=${taskId}`, {
                method: 'PATCH'
            });
            if (response.ok) {
                console.log("Task set as completed");
                onComplete();
            } else {
                console.log("Error during seting task as completed.");
            }
        } catch (err) {
            console.error("Internal server error:", err);
        }
    }

    const deleteTask = async () => {
        /* Delete a task in server */
        try {
            const response = await fetch(`http://localhost:5000/tasks?taskId=${taskId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log("Task deleted.")
                onDelete();
            } else {
                console.log("Error during deleting task.");
            }
        } catch (err) {
            console.error("Internal server error:", err);
        }
    }

    return (
        <div className={`task-card ${status} ${themeMode}`}>
            <button onClick={deleteTask} className="rounded-btn delete-btn">✘</button>
            <h3 className="task-title">{title}</h3>
            <button onClick={setTaskAsCompleted} className="rounded-btn complete-btn">✔</button>
        </div>
    );
};
    