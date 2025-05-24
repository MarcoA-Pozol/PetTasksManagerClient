import React from "react";

export interface PetContainerProps {
    authUser: any;
    theme: string;
    uncompletedTasksCount: number;
    completedTasksCount: number;
    selectedPetImage: string;
    setCompletedTasksPercentage: React.Dispatch<React.SetStateAction<number>>;
}