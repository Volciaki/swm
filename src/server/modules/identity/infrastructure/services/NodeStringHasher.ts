import bcrypt from "bcryptjs";
import type { StringHasher } from "../../application/services/StringHasher";

const SALT_ROUNDS = 12;

export class NodeStringHasher implements StringHasher {
	async hash(value: string) {
		const salt = await bcrypt.genSalt(SALT_ROUNDS);
		const hash = await bcrypt.hash(value, salt);
		return hash;
	}

	async verify(value: string, hash: string) {
		const result = await bcrypt.compare(value, hash);
		return result;
	}
}
