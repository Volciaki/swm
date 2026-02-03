export interface FIFOQueueManager<T> {
	getOldest(from?: T[]): Promise<T[]>;
	getSingleOldest(from?: T[]): Promise<T | null>;
	getYoungest(from?: T[]): Promise<T[]>;
	getSingleYoungest(from?: T[]): Promise<T | null>;
}
