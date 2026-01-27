import { z } from "zod";
import { InvalidBase64 } from "./error";

const isStringValidBase64 = (value: string): boolean => {
	const base64Schema = z.base64();
	const result = base64Schema.safeParse(value);
	return result.success;
};

export class Base64 {
	private constructor(public readonly value: string) {}

	static fromString(value: string) {
		if (!isStringValidBase64(value)) throw new InvalidBase64({ value });

		return new Base64(value);
	}
}
