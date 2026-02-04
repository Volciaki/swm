import { type FC, useState } from "react";
import { LoginForm, TwoFactorAuthenticationForm } from "@/ui/organisms";
import { PasswordResetFlow } from "../PasswordResetFlow";

// export type LoginFlowProps = {};

export const LoginFlow: FC = () => {
	const [authenticationId, setAuthenticationId] = useState<string | undefined>();
	const [passwordResetFlowShown, setPasswordResetFlowShown] = useState(false);

	if (passwordResetFlowShown)
		return (
			<PasswordResetFlow
				onPasswordReset={() => setPasswordResetFlowShown(false)}
				hideSelf={() => setPasswordResetFlowShown(false)}
			/>
		);

	return (
		<>
			{!authenticationId && (
				<LoginForm
					onAuthenticationId={(id) => setAuthenticationId(id)}
					setPasswordResetFlowShown={setPasswordResetFlowShown}
				/>
			)}

			{authenticationId && (
				<TwoFactorAuthenticationForm
					authenticationId={authenticationId}
					hideSelf={() => setAuthenticationId(undefined)}
				/>
			)}
		</>
	);
};
