import { useTranslation } from "react-i18next";

export const successMessage = (message:string) => {
    const { t } = useTranslation();

    return (
        <div style={{backgroundColor:"#4caf50"}}>
            {t(`${message}`)}
        </div>
    );
}