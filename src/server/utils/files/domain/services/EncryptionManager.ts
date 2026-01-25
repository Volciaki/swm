export interface EncryptionManager {
	encrypt(buffer: Buffer): Promise<Buffer>;
	decrypt(buffer: Buffer): Promise<Buffer>;
};
