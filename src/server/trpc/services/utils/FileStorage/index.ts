import type { GetServicesContext } from "../../context";
import { getS3FileStorage } from "./S3";

export const getFileStorageServices = (ctx: GetServicesContext) => {
	return {
		s3: getS3FileStorage(ctx),
	};
};
