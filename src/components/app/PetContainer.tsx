import skin1 from "../../assets/skin1nb.png";
import { useTranslation } from "react-i18next";
import "../../../i18n";

interface PetContainerProps {
    authUser: any;
}

const PetContainer = ({authUser}: PetContainerProps) => {
    const { t, i18n } = useTranslation();
    const completedTasks = 12;
    const toDoTasks = 4;
    const inProgressTasks = 7;
    const totalTasks = completedTasks + toDoTasks + inProgressTasks;
    console.log("------------------ ", authUser);

    return (
        <div className="right-content rounded-border">
            <h3 style={{fontFamily:"monospace", fontSize:"1.2rem"}}>{authUser ? authUser.username : "Loading..."}</h3>
            <img src={skin1} alt="pet image"></img>
            <div className="tasks-stats rounded-border spaced-around">
                <span id="completedTasks">{t("Completed")}: {completedTasks}</span>
                <span id="toDoTasks">{t("To do")}: {toDoTasks}</span>
                <span id="inProgressTasks">{t("In-progress")}: {inProgressTasks}</span>
            </div>
            <div className="pet-stats rounded-border spaced-around">
                <span id="completed-tasks-percentage">{Math.floor((completedTasks / totalTasks) * 100)}% / 100% ({totalTasks}) </span>
            </div>

            <button onClick={() => i18n.changeLanguage("en")}>Switch to English</button>
            <button onClick={() => i18n.changeLanguage("es")}>Switch to Spanish</button>
            <button onClick={() => i18n.changeLanguage("fr")}>Switch to French</button>
            <button onClick={() => i18n.changeLanguage("pt")}>Switch to Portuguese</button>
        </div>
    );
}

export default PetContainer;