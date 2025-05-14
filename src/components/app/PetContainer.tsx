import skin1 from "../../assets/skin1nb.png";

const PetContainer = () => {
    const completedTasks = 12;
    const toDoTasks = 4;
    const inProgressTasks = 7;
    const totalTasks = completedTasks + toDoTasks + inProgressTasks;

    return (
        <div className="right-content rounded-border">
            <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>JoseRanures</h3>
            <img src={skin1} alt="licenciado gallardo image"></img>
            <div className="tasks-stats rounded-border spaced-around">
                <span id="completedTasks">Completed: {completedTasks}</span>
                <span id="toDoTasks">To do: {toDoTasks}</span>
                <span id="inProgressTasks">In progress: {inProgressTasks}</span>
            </div>
            <div className="pet-stats rounded-border spaced-around">
                <span id="completed-tasks-percentage">{Math.floor((completedTasks / totalTasks) * 100)}% / 100% ({totalTasks}) </span>
            </div>
        </div>
    );
}

export default PetContainer;