export const sum = (numbers: number[]) => {
	return numbers.reduce((sum, number) => (sum += number), 0);
};
