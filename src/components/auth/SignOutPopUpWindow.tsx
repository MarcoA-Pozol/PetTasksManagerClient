import React from "react";
import { useAuthContext } from "../../context/authContext";

interface SIgnOutPopUpWindowProps {
    hideSignOutWindow:boolean;
    setHideSignOutWindow:React.Dispatch<React.SetStateAction<boolean>>
}
export const SignOutPopUpWindow = ({hideSignOutWindow, setHideSignOutWindow}:SIgnOutPopUpWindowProps) => {
    const {logout} = useAuthContext()!;

    const handleHideContent = async () => {
        setHideSignOutWindow(true);
    }

    const handleLogout = async () => {
        logout();
    }

    return (
        <div style={hideSignOutWindow == false ? (styles.opaqueBackground) : (styles.hideContent)}>
            <div style={hideSignOutWindow == false ? (styles.baseContainer) : (styles.hideContent)}>
                <h4 style={hideSignOutWindow == false ? (styles.questionText) : (styles.hideContent)}>Do you really want to leave now?</h4>
                <div style={hideSignOutWindow == false ? (styles.buttonsContainer) : (styles.hideContent)}>
                    <button style={hideSignOutWindow == false ? (styles.cancelButton) : (styles.hideContent)} onClick={handleHideContent}>Cancel</button>
                    <button style={hideSignOutWindow == false ? (styles.leaveButtonr) : (styles.hideContent)} onClick={handleLogout}>Leave</button>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    hideContent:{
        display:"none"
    },
    opaqueBackground: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    baseContainer: {
        backgroundColor: "rgb(36, 11, 94)",
        color: "white",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        zIndex: 1000,
    },
    questionText: {
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: "1.2em",
        marginBottom: "20px",
    },
    buttonsContainer: {
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
    },
    cancelButton: {
        flex: 1,
        padding: "10px",
        backgroundColor: "white",
        color: "rgb(20, 0, 120)",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
    },
    leaveButton: {
        flex: 1,
        padding: "10px",
        backgroundColor: "rgb(224, 72, 45)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
    },
};
