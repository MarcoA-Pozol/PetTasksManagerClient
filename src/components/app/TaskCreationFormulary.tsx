import "../../styles/app/taskCreationFormulary.css";
import { useTranslation } from "react-i18next";

const TaskCreationFormulary = () => {
    const { t } = useTranslation();

    return (
        <>
            <form className="create-task-form">
                <label>{t("Title")}</label>
                <input type="text"></input>
                <label>{t("Description")}</label>
                <input type="text"></input>
                <label>{t("Deadline")}</label>
                <input type="text"></input>
                <label>{t("Repeat")}</label>
                <input type="text"></input>
                <button>{t("Create")}</button>
            </form>
        </>
    );
}

export default TaskCreationFormulary;