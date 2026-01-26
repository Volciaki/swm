import { Client } from "minio";
import { environment } from "@/server/environment";
import { logger } from "@/server/logger";

// Light wrapper around the `minio` library providing some validation.
export class S3StorageService {
	private constructor(private readonly _client: Client) {}

	get client() {
		return this._client;
	}

	private async validate() {
		try {
			// This verifies the connection. `Client`'s constructor doesn't check anything.
			await this.client.listBuckets();
		} catch {
			logger.error(
				"MinIO connection has failed! Further errors may arise. It is advised to stop the program and redefine your secrets."
			);
		}
	}

	public async setup() {
		await this.validate();
	}

	static create() {
		const client = new Client({
			accessKey: environment.storage.accessKey,
			secretKey: environment.storage.secretKey,
			endPoint: environment.storage.endpoint,
			port: environment.storage.port,
			useSSL: environment.storage.sslEnabled,
		});

		return new S3StorageService(client);
	}
}
