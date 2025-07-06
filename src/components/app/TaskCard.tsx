import '../../styles/app/taskCard.css';
import { TaskCardProps } from '../../schemas/Task';
  
import api from '../../axios/Api';

export default function TaskCard({ title, status, themeMode, taskId, onComplete, onDelete}: TaskCardProps) {
    
    const setTaskAsCompleted = async () => {
        /* Set a task as completed in server */
        try {

            await api.patch(`http://localhost:5000/tasks?taskId=${taskId}`, {timeToResetInSeconds: 10})
            .then(() => {
                console.log("Task set as completed");
                onComplete();
            })
            .catch(() => console.log("Error during seting task as completed."));
                
        } catch (err) {
            console.error("Internal server error: ", err);
        }
    }

    const deleteTask = async () => {
        /* Delete a task in server */
        try {

            await api.delete(`http://localhost:5000/tasks?taskId=${taskId}`)
            .then(() => {
                console.log("Task deleted.")
                onDelete();
            })
            .catch(() => console.log("Error during deleting task."));

        } catch (err) {
            console.error("Internal server error:", err);
        }
    }

    // Hide "complete task" button for completed tasks
    let completeTaskButtonClass;
    if (status === "done") {
        completeTaskButtonClass =  "hidde";
    } else if (status === "to-do") {
        completeTaskButtonClass =  "rounded-btn complete-btn";
    } 

    return (
        <div className={`task-card ${status} ${themeMode}`}>
            <div className='delete-btn-container'>
                <button onClick={deleteTask} className="rounded-btn delete-btn">✘</button>
            </div>
            <h3 className="task-title">{title}</h3>
            <button onClick={setTaskAsCompleted} className={`${completeTaskButtonClass}`}>✔</button>
        </div>
    );
};
    