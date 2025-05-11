import { useState } from "react";
import "../../styles/app/appView.css";
import TaskCard from "./TaskCard";
import licenciadoGallardo from "../../assets/licenciado_gallardo.jpg";
import LeftMenu from "./LeftMenu";

const AppView = () => {
    const [theme, setTheme] = useState("light");

    const completedTasks = 12;
    const toDoTasks = 4;
    const inProgressTasks = 7;
    const totalTasks = completedTasks + toDoTasks + inProgressTasks;

    return (
        <>
            <body className={`app-container ${theme}`}>
                <div className="content-container">
                    <LeftMenu theme={theme} setTheme={setTheme}/>

                    <div className="middle-content rounded-border">
                        <TaskCard title="Remove Tailwind" description="Tailwind is not neccesary, it adds complexity." status="done" themeMode={theme}/>
                        <TaskCard title="Start login UI" description="Design login formulary style" status="in-progress" themeMode={theme}/>
                        <TaskCard title="Start register UI" description="Design register formulary style" status="pending" themeMode={theme}/>
                    </div>

                    <div className="right-content rounded-border">
                        <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>OVERALL STATS</h3>
                        <img src={licenciadoGallardo} alt="licenciado gallardo image"></img>
                        <div className="tasks-stats rounded-border spaced-around">
                            <span id="completedTasks">Completed: {completedTasks}</span>
                            <span id="toDoTasks">To do: {toDoTasks}</span>
                            <span id="inProgressTasks">In progress: {inProgressTasks}</span>
                        </div>
                        <div className="pet-stats rounded-border spaced-around">
                            <span id="completed-tasks-percentage">{Math.floor((completedTasks / totalTasks) * 100)}% / 100% ({totalTasks}) </span>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}

export default AppView;