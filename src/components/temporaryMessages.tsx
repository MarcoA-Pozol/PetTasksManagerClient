import { useTranslation } from "react-i18next";

interface temporaryMessageProps {
    message: string;
}

interface customMessageProps {
    message?: string;
    backgroundColor?: string;
    color?: string;
}

export const SuccessMessage = ({message}:temporaryMessageProps) => {
    const { t } = useTranslation();

    return (
        <div className="temporary-message" style={{backgroundColor:"#4caf50"}}>
            {t(`${message}`)}
        </div>
    );
}

export const WarningMessage = ({message}:temporaryMessageProps) => {
    const { t } = useTranslation();

    return (
        <div className="temporary-message" style={{backgroundColor:"#bb6a34"}}>
            {t(`${message}`)}
        </div>
    );
}

export const ErrorMessage = ({message}:temporaryMessageProps) => {
    const { t } = useTranslation();

    return (
        <div className="temporary-message" style={{backgroundColor:"#af4c4c"}}>
            {t(`${message}`)}
        </div>
    );
}

export const CustomMessage = ({message="You can customize this message", backgroundColor="purple", color="white"}:customMessageProps) => {
    const { t } = useTranslation();

    return (
        <div className="temporary-message" style={{backgroundColor:backgroundColor, color:color}}>
            {t(`${message}`)}
        </div>
    );
}