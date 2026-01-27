import { z } from "zod";
import { InvalidEmailError } from "../errors/InvalidEmailError";

const isStringValidEmail = (value: string): boolean => {
	const emailSchema = z.email();
	const result = emailSchema.safeParse(value);
	return result.success;
};

export class Email {
	private constructor(public readonly value: string) {}

	static fromString(value: string) {
		if (!isStringValidEmail(value)) throw new InvalidEmailError({ email: value });

		return new Email(value);
	}
}
