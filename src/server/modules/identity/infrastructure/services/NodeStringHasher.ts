import bcrypt from "bcryptjs";
import { StringHasher } from "../../application/services/StringHasher";

export class NodeStringHasher implements StringHasher {
	async hash(value: string) {
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(value, salt);
		return hash;
	}

	async verify(value: string, hash: string) {
		const result = await bcrypt.compare(value, hash);
		return result;
	}
}
