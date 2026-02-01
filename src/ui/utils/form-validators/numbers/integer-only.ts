import type { FormValidator } from "../type";

export const integerOnlyValidator: FormValidator = (
	value: string,
	errorMessage: string = "Tekst musi być prawidłową liczbą całkowitą."
) => {
	if (value.trim() === "") return errorMessage;
	if (isNaN(Number(value))) return errorMessage;
	if (!Number.isInteger(Number(value))) return errorMessage;
};
