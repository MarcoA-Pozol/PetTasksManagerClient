import { FaTrash } from "react-icons/fa";

interface DeleteAccountButtonProps {
    styles: any;
}
export const DeleteAccountButton = ({styles}:DeleteAccountButtonProps) => {
    return (

            <button style={styles.deleteAccountButton}><FaTrash/> Delete Account</button>
    );
}