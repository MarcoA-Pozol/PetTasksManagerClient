import "../../styles/app/taskCreationFormulary.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const TaskCreationFormulary = () => {
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [repeat, setRepeat] = useState("");

    return (
        <>
            <form className={`create-task-form`}>
                <label>{t("Title")}</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label>{t("Description")}</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <label>{t("Deadline")}</label>
                <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)}></input>
                <label>{t("Repeat")}</label>
                <input type="text" value={repeat} onChange={(e) => setRepeat(e.target.value)}></input>
                <button>{t("Create")}</button>
            </form>
        </>
    );
}

export default TaskCreationFormulary;