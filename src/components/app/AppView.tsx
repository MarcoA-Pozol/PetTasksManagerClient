import { useState } from "react";
import "../../styles/app/appView.css";
import LeftMenu from "./LeftMenu";
import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";

const AppView = () => {
    const [theme, setTheme] = useState("light");
    
    return (
        <>
            <body className={`app-container ${theme}`}>
                <div className="content-container">
                    <LeftMenu theme={theme} setTheme={setTheme}/>
                    <TasksContainer theme={theme}/>
                    <PetContainer/>
                </div>
            </body>
        </>
    );
}

export default AppView;