import '../../styles/app/taskCard.css';

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
            <button className="complete-btn">✔</button>
        </div>
    );
};
  