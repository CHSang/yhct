export const convertSecondsToMinutes = (seconds: number) : number => {
    if (!seconds || seconds === 0) return 0;
    
    return parseFloat((seconds/60).toFixed(2));
};
