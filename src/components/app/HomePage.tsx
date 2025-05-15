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

const HomePage = ({theme, authUser}:HomePageProps) => {

    return (
        <>
            <TasksContainer theme={theme} authUser={authUser}/>
            <PetContainer authUser={authUser}/>
        </>
    );
}

export default HomePage;