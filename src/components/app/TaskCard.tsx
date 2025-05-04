import '../../styles/taskCard.css';

type TaskCardProps = {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
    themeMode: string;
};
  
export default function TaskCard({ title, description, status, themeMode }: TaskCardProps) {
return (
        <div className={`task-card ${status} ${themeMode}`}>
            <h3 className="task-title">{title}</h3>
            <p className="task-description">{description}</p>

            <div className="task-actions">
                <button className="start-btn">Begin Task</button>
                <button className="complete-btn">Mark as completed</button>
            </div>
        </div>
    );
};
  