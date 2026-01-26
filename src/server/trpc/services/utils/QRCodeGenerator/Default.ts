import { DefaultQRCodeGenerator } from "@/server/utils/qr-codes/infrastructure/services/QRCodeGenerator";
import type { GetServicesContext } from "../../context";

export const getDefaultQRCodeGenerator = (ctx: GetServicesContext): DefaultQRCodeGenerator => {
	return new DefaultQRCodeGenerator();
};
