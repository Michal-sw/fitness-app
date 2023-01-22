export const validateSurver = (waterAnswer: number, sleepAnswer: number, trainingAnswer: number) => {
    return waterAnswer > 0 && sleepAnswer > 0 && trainingAnswer > 0;
}
