import React from "react";

interface DeleteAccountFormProps {
  hideAccountDeleteForm: boolean;
  setHideAccountDeleteForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteAccountForm = ({ hideAccountDeleteForm, setHideAccountDeleteForm }: DeleteAccountFormProps) => {

  const handleHideContent = () => {
    setHideAccountDeleteForm(true);
  };

  const handleConfirmDelete = () => {
    // Logic goes here (to be implemented by you)
  };

  return (
    <div style={hideAccountDeleteForm ? styles.hideContent : styles.opaqueBackground}>
      <div style={hideAccountDeleteForm ? styles.hideContent : styles.baseContainer}>
        <h4 style={styles.questionText}>Are you sure you want to delete your account?</h4>

        <p style={styles.warningText}>
          Warning: All your data will be permanently deleted 24 hours after this request. This action cannot be undone.
        </p>

        <div style={styles.formGroup}>
          <label style={styles.label}>Type <strong>"I accept"</strong> to confirm:</label>
          <input type="text" name="confirmation" style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input type="password" name="password" style={styles.input} />
        </div>

        <div style={styles.buttonsContainer}>
          <button style={styles.cancelButton} onClick={handleHideContent}>Cancel</button>
          <button style={styles.deleteButton} onClick={handleConfirmDelete}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  hideContent: {
    display: "none",
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
    maxWidth: "420px",
    textAlign: "center",
    zIndex: 1000,
  },
  questionText: {
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: "1.2em",
    marginBottom: "16px",
  },
  warningText: {
    fontSize: "0.95em",
    color: "#f9d371",
    marginBottom: "20px",
    lineHeight: "1.4",
  },
  formGroup: {
    marginBottom: "16px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1em",
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
  deleteButton: {
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

