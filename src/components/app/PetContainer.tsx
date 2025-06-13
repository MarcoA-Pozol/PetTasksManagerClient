import { useTranslation } from "react-i18next";
import "../../../i18n";
import { PetContainerProps } from "../../schemas/PetContainer";

const PetContainer = ({authUser, theme, uncompletedTasksCount, completedTasksCount, selectedPetImage, petState, completedTasksPercentage}: PetContainerProps) => {
    const { t } = useTranslation();
    const totalTasks = completedTasksCount + uncompletedTasksCount;

    let petStateTextColor;
    if (petState==="I'm lazy") {
        petStateTextColor = "violet";
    } else if (petState==="Hurry up!") {
        petStateTextColor = "red";
    } else if (petState==="Occupied") {
        petStateTextColor = "orange"
    } else if (petState==="Relax") {
        petStateTextColor = "green"
    } else {
        petStateTextColor = "blue" ;
    }

    const completedPercentage = totalTasks > 0 ? Math.floor((completedTasksCount / totalTasks) * 100) : 0; 
    completedTasksPercentage.current = completedPercentage;

    return (
        <div className={`right-content rounded-border ${theme}`}>
            <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>{authUser ? authUser.username : "Loading..."}</h3>
            <img src={selectedPetImage} alt="pet image" style={{width:"100%", height:"250px"}}></img>
            <span style={{color:`${petStateTextColor}`, fontWeight:"bold", fontSize:"1.4rem"}}>{petState}</span>
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