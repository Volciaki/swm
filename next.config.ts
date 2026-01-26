import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	outputFileTracingIncludes: {
		"/api/**": ["src/server/assets/**"],
	},
	serverExternalPackages: ["pdfkit", "@node-rs/crc32"],
	output: "standalone",
};

export default nextConfig;
