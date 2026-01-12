import { Base64 } from "./entity";

export class Base64Mapper {
	static toBuffer(base64: Base64): Buffer {
		return Buffer.from(base64.value, "base64");
	}

	static fromBuffer(buffer: Buffer): Base64 {
		const base64String = buffer.toString("base64");
		return Base64.fromString(base64String);
	}
}
