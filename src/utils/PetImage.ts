
interface pickOneRandomPetImageProps {
    completedTasksPercentage:React.RefObject<number>;
    setSelectedPetImage:React.Dispatch<React.SetStateAction<string>>;
    badPetImagesPaths:string[];
    notBadPetImagesPaths:string[];
    goodPetImagesPaths:string[];
    perfectPetImagesPaths:string[];
}
export const pickOneRandomPetImage = ({completedTasksPercentage, setSelectedPetImage, badPetImagesPaths, notBadPetImagesPaths, goodPetImagesPaths, perfectPetImagesPaths}:pickOneRandomPetImageProps) => {
    const randomImageIndex = Math.floor(Math.random() * 3);

    if (completedTasksPercentage.current < 40) {
        setSelectedPetImage(badPetImagesPaths[randomImageIndex]);
    }
    else if (completedTasksPercentage.current < 70 && completedTasksPercentage.current >= 40) {
        setSelectedPetImage(notBadPetImagesPaths[randomImageIndex]);
    }
    else if (completedTasksPercentage.current < 90 && completedTasksPercentage.current >= 70) {
        setSelectedPetImage(goodPetImagesPaths[randomImageIndex]);
    }
    else if (completedTasksPercentage.current >= 90) {
        setSelectedPetImage(perfectPetImagesPaths[randomImageIndex]);
    }
};