import { serialize as serializeCookie } from "cookie";
import { environment } from "@/server/environment";
import { EnvironmentType } from "@/server/environment/type";

export class Logout {
	getCookie(): string {
		const cookie = serializeCookie({
			name: environment.authentication.cookie.name,
			value: "",
			sameSite: "strict",
			secure: environment.type === EnvironmentType.PRODUCTION,
			maxAge: 0,
		});

		return cookie;
	}
}
