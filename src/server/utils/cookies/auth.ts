import { serialize as serializeCookie } from "cookie";
import { environment } from "@/server/environment";
import { EnvironmentType } from "@/server/environment/type";

export const generateAuthCookieByTokenValue = (token: string): string => {
	const cookie = serializeCookie({
		name: environment.authentication.cookie.name,
		value: token,
		sameSite: "strict",
		secure: environment.type === EnvironmentType.PRODUCTION,
	});

	return cookie;
};
