import { FaTrash } from "react-icons/fa";

interface DeleteAccountButtonProps {
    setHideAccountDeleteForm: React.Dispatch<React.SetStateAction<boolean>>;
    styles: any;
}
export const DeleteAccountButton = ({styles, setHideAccountDeleteForm}:DeleteAccountButtonProps) => {
    return (
            <button style={styles.deleteAccountButton} onClick={() => {setHideAccountDeleteForm(false)}}><FaTrash/> Delete Account</button>
    );
}