import { Base64 } from "./entity";

export class Base64Mapper {
	static toBuffer(base64: Base64): Buffer {
		return Buffer.from(base64.value, "base64");
	}
}
