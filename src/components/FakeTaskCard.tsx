type TaskCardProps = {
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
  };
  
const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    'in-progress': 'bg-blue-100 text-blue-700',
    done: 'bg-green-100 text-green-700',
};
  
export default function TaskCard({ title, description, status }: TaskCardProps) {
return (
    <div className="rounded-2xl shadow-md border border-gray-200 p-4 w-full max-w-md bg-red">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 mb-3">{description}</p>
    <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusColors[status]}`}>
        {status.replace('-', ' ')}
    </span>
    </div>
);
}
  