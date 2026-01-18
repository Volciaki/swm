import { DefaultQRCodeGenerator } from "@/server/utils/qr-codes/infrastructure/services/QRCodeGenerator";
import { GetServicesContext } from "../../context";

export const getDefaultQRCodeGenerator = (ctx: GetServicesContext): DefaultQRCodeGenerator => {
	return new DefaultQRCodeGenerator();
}
