import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	outputFileTracingIncludes: {
		"/api/**": ["src/server/assets/**"],
	},
	serverExternalPackages: ["pdfkit"],
};

export default nextConfig;
