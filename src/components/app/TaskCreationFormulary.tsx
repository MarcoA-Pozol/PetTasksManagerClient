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
                <h2>{t("Create a Task")}</h2>
                <input type="text" placeholder={t("Title")} value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input type="text" placeholder={t("Description")} value={description} onChange={(e) => setDescription(e.target.value)}></input>
                <input type="text" placeholder={t("Deadline")}  value={deadline} onChange={(e) => setDeadline(e.target.value)}></input>
                <input type="text" placeholder={t("Repeat")}  value={repeat} onChange={(e) => setRepeat(e.target.value)}></input>
                <button type="submit">{t("Create")}</button>
            </form>
        </>
    );
}

export default TaskCreationFormulary;