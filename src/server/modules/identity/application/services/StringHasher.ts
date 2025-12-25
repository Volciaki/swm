export interface StringHasher {
    hash(value: string): string;
    verify(value: string, hash: string): boolean;
}
