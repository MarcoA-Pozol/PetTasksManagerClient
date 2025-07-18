import { NavigateFunction } from "react-router-dom";

export interface handleSignUpParams {
    authenticate: (user:any) => void;
    temporaryMessage: {
        display: (message: string, color: string) => void
    };
    navigate: NavigateFunction
}