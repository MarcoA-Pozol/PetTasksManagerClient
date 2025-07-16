import { useTranslation } from "react-i18next";

interface temporaryMessageProps {
    message: string;
    color: string;
}

export const TemporaryMessage = ({message, color}:temporaryMessageProps) => {
    const { t } = useTranslation();

    return (
        <div className="temporary-message" style={{backgroundColor:color, margin:"auto"}}>
            {t(`${message}`)}
        </div>
    );
}