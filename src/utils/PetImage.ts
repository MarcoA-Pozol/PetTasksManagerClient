// Pet images
// Load all from dir (as json objects) 
const lazyPetImages = import.meta.glob('../assets/pet/lazy/*.png', {eager: true}) as Record<string, {default: string}>;
const worriedPetImages = import.meta.glob('../assets/pet/worried/*.png', {eager: true}) as Record<string, {default: string}>;
const busyPetImages = import.meta.glob('../assets/pet/busy/*.png', {eager: true}) as Record<string, {default: string}>;
const calmPetImages = import.meta.glob('../assets/pet/calm/*.png', {eager: true}) as Record<string, {default: string}>;
// Where 'default' is type string json attribute containing image path (print petImages in console if hard to understand)
const lazyPetImagesPaths = Object.values(lazyPetImages).map(image => image.default); 
const worriedPetImagesPaths = Object.values(worriedPetImages).map(image => image.default);
const busyPetImagesPaths = Object.values(busyPetImages).map(image => image.default);
const calmPetImagesPaths = Object.values(calmPetImages).map(image => image.default);

interface pickOneRandomPetImageProps {
    completedTasksPercentage: React.RefObject<number>;
    setSelectedPetImage: React.Dispatch<React.SetStateAction<string>>;
    setPetState: React.Dispatch<React.SetStateAction<string>>;
}
export const pickOneRandomPetImage = ({completedTasksPercentage, setSelectedPetImage, setPetState}:pickOneRandomPetImageProps) => {
    const randomImageIndex = Math.floor(Math.random() * 3);

    if (completedTasksPercentage.current < 40) {
        setSelectedPetImage(lazyPetImagesPaths[randomImageIndex]);
        setPetState("I'm lazy");
    }
    else if (completedTasksPercentage.current < 70 && completedTasksPercentage.current >= 40) {
        setSelectedPetImage(worriedPetImagesPaths[randomImageIndex]);
        setPetState("Hurry up!");
    }
    else if (completedTasksPercentage.current < 90 && completedTasksPercentage.current >= 70) {
        setSelectedPetImage(busyPetImagesPaths[randomImageIndex]);
        setPetState("Occupied");
    }
    else if (completedTasksPercentage.current >= 90) {
        setSelectedPetImage(calmPetImagesPaths[randomImageIndex]);
        setPetState("Relax");
    }
};