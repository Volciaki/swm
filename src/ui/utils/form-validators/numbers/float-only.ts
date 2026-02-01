import type { FormValidator } from "../type";

export const floatOnlyValidator: FormValidator = (
	value: string,
	errorMessage = "Tekst musi być prawidłową liczbą dziesiętna."
) => {
	if (value.trim() === "") return errorMessage;
	if (isNaN(Number(value))) return errorMessage;
};
