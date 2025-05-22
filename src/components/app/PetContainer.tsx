import { useTranslation } from "react-i18next";
import "../../../i18n";
import { PetContainerProps } from "../../schemas/PetContainer";

const PetContainer = ({authUser, theme, uncompletedTasksCount, completedTasksCount, selectedPetImage}: PetContainerProps) => {
    const { t } = useTranslation();
    const totalTasks = completedTasksCount + uncompletedTasksCount;

    const completedPercentage = totalTasks > 0 ? Math.floor((completedTasksCount / totalTasks) * 100) : 100; 

    return (
        <div className={`right-content rounded-border ${theme}`}>
            <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>{authUser ? authUser.username : "Loading..."}</h3>
            <img src={selectedPetImage} alt="pet image" style={{width:"100%", height:"250px"}}></img>
            <div className="tasks-stats rounded-border spaced-around">
                <span id="completedTasks">{t("Completed")}: {completedTasksCount}</span>
                <span id="toDoTasks">{t("To do")}: {uncompletedTasksCount}</span>
            </div>
            <div className="pet-stats rounded-border spaced-around">
                <span id="completed-tasks-percentage">{completedPercentage}% / 100% ({totalTasks})</span>
            </div>
        </div>
    );
}

export default PetContainer;