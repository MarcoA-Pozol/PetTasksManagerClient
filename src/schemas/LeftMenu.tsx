export interface LeftMenuProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
    setHideSignOutWindow: React.Dispatch<React.SetStateAction<boolean>>;
}