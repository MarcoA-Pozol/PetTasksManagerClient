import TasksContainer from "./TasksContainer";
import PetContainer from "./PetContainer";
import { HomePageProps } from "../../schemas/HomePage";

const HomePage = ({theme, authUser, selectedPetImage, petState, removeTaskFromListOnCompleted, removeTaskFromListOnDeletion, diminishUncompletedTasksCount, diminishCompletedTasksCount, increaseCompletedTasksCount, completedTasksList, uncompletedTasksList, completedTasksCount, uncompletedTasksCount, completedTasksPercentage}:HomePageProps) => {

    return (
        <>
            <TasksContainer theme={theme} authUser={authUser} uncompletedTasksList={uncompletedTasksList} completedTasksList={completedTasksList} removeTaskFromListOnDeletion={removeTaskFromListOnDeletion} removeTaskFromListOnCompleted={removeTaskFromListOnCompleted} diminishUncompletedTasksCount={diminishUncompletedTasksCount} diminishCompletedTasksCount={diminishCompletedTasksCount} increaseCompletedTasksCount={increaseCompletedTasksCount}/>
            <PetContainer authUser={authUser} theme={theme} completedTasksPercentage={completedTasksPercentage} uncompletedTasksCount={uncompletedTasksCount} completedTasksCount={completedTasksCount} selectedPetImage={selectedPetImage} petState={petState}/>
        </>
    );
}

export default HomePage;