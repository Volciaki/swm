import { type FC, useState } from "react";
import { PasswordResetForm, ResetPasswordEmailForm } from "@/ui/organisms";

export type PasswordResetFlow = {
	onPasswordReset: () => void;
};

export const PasswordResetFlow: FC<PasswordResetFlow> = ({ onPasswordReset }) => {
	const [email, setEmail] = useState<string | undefined>();
	const [authenticationId, setAuthenticationId] = useState<string | undefined>();

	return (
		<>
			{(!email || !authenticationId) && (
				<ResetPasswordEmailForm setEmail={setEmail} setAuthenticationId={setAuthenticationId} />
			)}

			{authenticationId && <PasswordResetForm authenticationId={authenticationId} onPasswordReset={onPasswordReset} />}
		</>
	);
};
