import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { environment } from "@/server/environment";
import { EncryptionManager } from "../../domain/services/EncryptionManager";

const ALGORITHM = "aes-256-gcm"

const getDigestFromEncryptionKey = (key: string) => createHash("sha256").update(key).digest();

export class DefaultEncryptionManager implements EncryptionManager {
	private encryptionKey: string;
	private ivBytes: number;
	private tagBytes: number;

	constructor() {
		this.encryptionKey = environment.encryption.key;
		this.ivBytes = 12;
		this.tagBytes = 16;
	}

	async encrypt(buffer: Buffer) {
		const iv = randomBytes(this.ivBytes);
		const digest = getDigestFromEncryptionKey(this.encryptionKey);

		const cipher = createCipheriv(ALGORITHM, digest, iv);
		const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
		const tag = cipher.getAuthTag();

		return Buffer.concat([iv, tag, encrypted])
	}

	async decrypt(buffer: Buffer) {
		const digest = getDigestFromEncryptionKey(this.encryptionKey)

		const ivStart = 0
		const ivEnd = this.ivBytes

		const tagStart = ivEnd
		const tagEnd = tagStart + this.tagBytes

		const dataStart = tagEnd;

		const iv = buffer.subarray(ivStart, ivEnd)
		const tag = buffer.subarray(tagStart, tagEnd)
		const data = buffer.subarray(dataStart)

		const decipher = createDecipheriv(ALGORITHM, digest, iv)
		decipher.setAuthTag(tag)

		return Buffer.concat([decipher.update(data), decipher.final()])
	}
}
