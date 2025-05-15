import LeftMenu from "./LeftMenu";
import TaskCreationFormulary from "./TaskCreationFormulary";

interface CreateTaskPageProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean |  null>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
    authUser:any;
}

const CreateTaskPage = ({theme, setTheme, isAuthenticated, authUser, setIsAuthenticated, setDisplayedPage}:CreateTaskPageProps) => {

    return (
        <>
            <LeftMenu theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setDisplayedPage={setDisplayedPage}/>
            <TaskCreationFormulary/>
        </>
    );
}

export default CreateTaskPage;