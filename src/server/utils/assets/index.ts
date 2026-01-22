import { readFileSync } from "fs";
import path from "path";

type AssetName = "qr-logo.png" | "inter.ttf" | "inter-bold.ttf";

export const loadAssetByName = (name: AssetName): Buffer => {
	const pathString = path.join(process.cwd(), `src/server/assets/${name}`);
	const buffer = readFileSync(pathString);
	return buffer;
};
