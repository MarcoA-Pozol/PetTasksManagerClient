import TaskCard from "./TaskCard";

interface TasksContainerProps {
    theme: string;
}

const TasksContainer = ({theme}:TasksContainerProps) => {

    return (
        <div className="middle-content rounded-border">
            <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done" themeMode={theme}/>
            <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress" themeMode={theme}/>
            <TaskCard title="Start register UI" description="Design register formulary style" status="pending" themeMode={theme}/>
        </div>
    );
}

export default TasksContainer;