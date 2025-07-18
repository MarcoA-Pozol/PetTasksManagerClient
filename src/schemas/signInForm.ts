import { SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export interface handleSignInParams {
    authenticate: (user: any) => void;
    setIsEmailVerified: (verified: boolean) => void | React.Dispatch<SetStateAction<boolean>>;
    temporaryMessage: {
        display: (message: string, color: string) => void;
    };
    navigate: NavigateFunction;
}
