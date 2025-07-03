import { FaLock, FaSave, FaUserLock } from "react-icons/fa";


interface UpdatePasswordFormProps {
    styles: any;
}
export const UpdatePasswordForm = ({styles}:UpdatePasswordFormProps) => {
    return (
        <div style={styles.card}>
            <FaLock size={50} style={styles.icon} />
            <h2 style={styles.sectionTitle}>Change Password</h2>
            <form method="PUT" style={styles.form}>
                <label style={styles.label}>
                    <FaUserLock/>
                    <input type="password" placeholder="Enter new password" style={styles.input} />
                </label>
                <label style={styles.label}>
                    <FaUserLock/>
                    <input type="password" placeholder="Repeat new password" style={styles.input} />
                </label>
                <button type="submit" style={styles.saveButton}>
                    <FaSave style={styles.buttonIcon}/> Save
                </button>
            </form>
        </div>
    );
}