import { useResponsiveCssValue } from "../../hooks/useResponsiveCSSValue";

export const useAuthFormStyles = (): { [key: string]: React.CSSProperties } => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        baseContainer: {
        display: 'flex',
        height: '100vh',
        width: '100%',
        backgroundColor: '#0071e2',
        fontFamily: "'Inter', sans-serif"
        },
        formContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.03)'
        },
        authForm: {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid whitesmoke',
        boxShadow: '2px 2px 1px white'
        },
        authTitle: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: responsiveCssValue("wheat", "rgb(226, 226, 226)"),
        marginBottom: '1rem',
        textAlign: 'center',
        },
        authInput: {
        backgroundColor: 'rgb(252, 231, 231)',
        color: 'rosybrown',
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.2s ease'
        },
        authInputFocus: {
        borderColor: '#3b82f6',
        boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)'
        },
        authButton: {
        padding: '0.75rem 1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: '#211a46',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease, transform 0.1s ease'
        },
        authButtonHover: {
        backgroundColor: '#101246'
        },
        authButtonActive: {
        transform: 'scale(0.98)'
        },
        forgotPasswordButton: {
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'rgb(207, 204, 230)',
        fontWeight: 500,
        transitionDuration: '0.8s'
        },
        toggleFormsButton: {
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'rgb(207, 204, 230)',
        fontWeight: 500,
        transitionDuration: '0.8s'
        },
        toggleFormsButtonHover: {
        transform: 'scale(1.05)'
        }
    };
};