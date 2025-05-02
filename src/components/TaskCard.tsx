import '../static/styles/taskCard.css';

type TaskCardProps = {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
};
  
export default function TaskCard({ title, description, status }: TaskCardProps) {
return (
        <div className={`task-card ${status}`}>
            <h3 className="task-title">{title}</h3>
            <p className="task-description">{description}</p>
            <span className="task-status">{status.replace("-", " ")}</span>

            <div className="task-actions">
                <button className="start-btn">Begin Task</button>
                <button className="complete-btn">Mark as completed</button>
            </div>
        </div>
    );
}
  