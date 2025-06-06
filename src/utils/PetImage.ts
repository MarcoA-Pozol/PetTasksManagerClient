// Pet images
// Load all from dir (as json objects) 
const badPetImages = import.meta.glob('../../assets/pet/bad/*.png', {eager: true}) as Record<string, {default: string}>;
const notBadPetImages = import.meta.glob('../../assets/pet/not_bad/*.png', {eager: true}) as Record<string, {default: string}>;
const goodPetImages = import.meta.glob('../../assets/pet/good/*.png', {eager: true}) as Record<string, {default: string}>;
const perfectPetImages = import.meta.glob('../../assets/pet/perfect/*.png', {eager: true}) as Record<string, {default: string}>;
// Where 'default' is type string json attribute containing image path (print petImages in console if hard to understand)
const badPetImagesPaths = Object.values(badPetImages).map(image => image.default); 
const notBadPetImagesPaths = Object.values(notBadPetImages).map(image => image.default);
const goodPetImagesPaths = Object.values(goodPetImages).map(image => image.default);
const perfectPetImagesPaths = Object.values(perfectPetImages).map(image => image.default);

interface pickOneRandomPetImageProps {
    completedTasksPercentage: React.RefObject<number>;
    setSelectedPetImage: React.Dispatch<React.SetStateAction<string>>;
}
export const pickOneRandomPetImage = ({completedTasksPercentage, setSelectedPetImage}:pickOneRandomPetImageProps) => {
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