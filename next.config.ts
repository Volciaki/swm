import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactCompiler: true,
	outputFileTracingIncludes: {
		"/api/**": ["src/server/assets/**"],
	},
};

export default nextConfig;
