import LeftMenu from "./LeftMenu";
import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";

interface HomePageProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean |  null>>;
    setDisplayedPage: React.Dispatch<React.SetStateAction<string>>;
    authUser:any;
}

const HomePage = ({theme, setTheme, isAuthenticated, authUser, setIsAuthenticated, setDisplayedPage}:HomePageProps) => {

    return (
        <>
            <LeftMenu theme={theme} setTheme={setTheme} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setDisplayedPage={setDisplayedPage}/>
            <TasksContainer theme={theme} authUser={authUser}/>
            <PetContainer/>
        </>
    );
}

export default HomePage;