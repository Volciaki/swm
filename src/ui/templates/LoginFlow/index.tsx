import { type FC, useState } from "react";
import { LoginForm, TwoFactorAuthenticationForm } from "@/ui/organisms";

// export type LoginFlowProps = {};

export const LoginFlow: FC = () => {
	const [authenticationId, setAuthenticationId] = useState<string | undefined>();

	return (
		<>
			{!authenticationId && <LoginForm onAuthenticationId={(id) => setAuthenticationId(id)} />}

			{authenticationId && <TwoFactorAuthenticationForm authenticationId={authenticationId} />}
		</>
	);
};
