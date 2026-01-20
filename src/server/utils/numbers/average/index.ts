import { sum } from "../sum";

export const average = (numbers: number[]) => {
	return sum(numbers) / numbers.length;
};
