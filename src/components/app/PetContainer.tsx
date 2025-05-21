import skin1 from "../../assets/skin1nb.png";
import skin2 from "../../assets/login_bg_img.png";
import skin3 from "../../assets/login_stain_img.png";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import { PetContainerProps } from "../../schemas/PetContainer";

const PetContainer = ({authUser, theme, uncompletedTasksCount, completedTasksCount}: PetContainerProps) => {
    const petImages = [skin1, skin2, skin3]; 
    const { t } = useTranslation();
    const totalTasks = completedTasksCount + uncompletedTasksCount;

    // Pick one random pet image
    const randomImageIndex = Math.floor(Math.random() * petImages.length);
    const selectedPetImage = petImages[randomImageIndex]; 

    return (
        <div className={`right-content rounded-border ${theme}`}>
            <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>{authUser ? authUser.username : "Loading..."}</h3>
            <img src={selectedPetImage} alt="pet image"></img>
            <div className="tasks-stats rounded-border spaced-around">
                <span id="completedTasks">{t("Completed")}: {completedTasksCount}</span>
                <span id="toDoTasks">{t("To do")}: {uncompletedTasksCount}</span>
            </div>
            <div className="pet-stats rounded-border spaced-around">
                <span id="completed-tasks-percentage">{Math.floor((completedTasksCount / totalTasks) * 100)}% / 100% ({totalTasks}) </span>
            </div>
        </div>
    );
}

export default PetContainer;