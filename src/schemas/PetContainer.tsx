import React from "react";

export interface PetContainerProps {
    authUser: any;
    theme: string;
    uncompletedTasksCount: number;
    completedTasksCount: number;
    selectedPetImage: string;
    petState: string;
    completedTasksPercentage: React.MutableRefObject<number>;
}