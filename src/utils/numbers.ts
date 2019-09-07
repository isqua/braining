export const getNumber = (length: number): number => Math.floor(
    getNumberBetween(
        Math.pow(10, length - 1),
        Math.pow(10, length),
    ),
);

export const getNumberBetween = (start: number, end: number): number => Math.floor(
    start + Math.random() * (end - start),
);
