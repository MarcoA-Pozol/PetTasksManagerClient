type TaskCardProps = {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
  };
  
const statusColors = {
    pending: 'rgb(120, 80, 20)',
    'in-progress': 'rgb(90, 20, 150)',
    done: 'rgb(40, 140, 20)',
};
  
export default function TaskCard({ title, description, status }: TaskCardProps) {
return (
    <div>
        <h3>{title}</h3>
        <p >{description}</p>
        <span style={{color:statusColors[status], fontWeight:"bold"}}>
            {status.replace('-', ' ')}
        </span>
    </div>
);
}
  