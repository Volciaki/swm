// It's genuinely crazy that JS doesn't have anything like `randint` in the standard library...
export const randomInclusiveFloat = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};
