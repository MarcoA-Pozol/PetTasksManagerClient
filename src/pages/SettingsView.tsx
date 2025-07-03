import React from "react";
import { UpdateProfileDataForm } from "../components/settings/UpdateProfileDataForm";
import { UpdatePasswordForm } from "../components/settings/UpdatePasswordForm";
import { DeleteAccountButton } from "../components/settings/DeleteAccountButton";

export const SettingsView = () => {
    return (
        <div style={styles.baseProfileView}>
            <UpdateProfileDataForm styles={styles}/>
            <UpdatePasswordForm styles={styles}/>
            <DeleteAccountButton styles={styles}/>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    baseProfileView: {
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        padding: "40px 20px"
    },
    card: {
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#24155E",
        marginBottom: "20px",
    },
    icon: {
        color: "#24155E",
        marginBottom: "10px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    label: {
        fontWeight: 500,
        fontSize: "0.9rem",
        textAlign: "left",
        color: "#333",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px"
    },
    input: {
        marginTop: "5px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        width: "100%",
        boxSizing: "border-box"
    },
    saveButton: {
        backgroundColor: "#24155E",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "10px 20px",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        marginTop: "10px",
        transition: "background-color 0.3s ease"
    },
    buttonIcon: {
        fontSize: "1.1rem"
    },
    deleteAccountButton: {
        backgroundColor:"red",
        color:"white",
        padding: "5px 10px",
        borderRadius: "10px",
        fontSize: "0.8rem",
        fontFamily: "monospace",
        fontWeight: "bold",
        width: "90%",
        maxWidth: "500px",
        marginTop: "50px"
    }
};
