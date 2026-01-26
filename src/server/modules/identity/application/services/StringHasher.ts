export interface StringHasher {
	hash(value: string): Promise<string>;
	verify(value: string, hash: string): Promise<boolean>;
}
