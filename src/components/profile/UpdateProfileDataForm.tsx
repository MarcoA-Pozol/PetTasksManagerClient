import { FaUserCircle, FaSave, FaMailBulk, FaUserEdit } from "react-icons/fa";

interface UpdateProfileDataFormProps {
    styles:any;
}
export const UpdateProfileDataForm = ({styles}:UpdateProfileDataFormProps) => {
    return (
        <div style={styles.card}>
            <FaUserCircle size={50} style={styles.icon} />
            <h2 style={styles.sectionTitle}>My Profile</h2>
            <form method="PUT" style={styles.form}>
                <label style={styles.label}>
                    <FaUserEdit/>
                    <input type="text" placeholder="Username" style={styles.input} />
                </label>
                <label style={styles.label}>
                    <FaMailBulk/>
                    <input type="email" placeholder="Email" style={styles.input} />
                </label>
                <button type="submit" style={styles.saveButton}>
                    <FaSave style={styles.buttonIcon}/> Save
                </button>
            </form>
        </div>
    );
}