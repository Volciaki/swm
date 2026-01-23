export const clampNumberToMinMax = (num: number, min: number, max: number) => {
	if (num <= min) return min;
	if (num >= max) return max;

	return num;
};
