import { type FC, useCallback, useState } from "react";
import { PasswordResetForm, ResetPasswordEmailForm } from "@/ui/organisms";

export type PasswordResetFlow = {
	onPasswordReset: () => void;
	hideSelf: () => void;
};

export const PasswordResetFlow: FC<PasswordResetFlow> = ({ onPasswordReset, hideSelf }) => {
	const [authenticationId, setAuthenticationId] = useState<string | undefined>();
	const [step, setStep] = useState<"email" | "2fa">("email");

	const goBackToEmailForm = useCallback(() => {
		setAuthenticationId(undefined);
		setStep("email");
	}, []);

	return (
		<>
			{step === "email" && (
				<ResetPasswordEmailForm
					onSuccess={(email, id) => {
						setAuthenticationId(id);
						setStep("2fa");
					}}
					hideResetPasswordForm={hideSelf}
				/>
			)}

			{step === "2fa" && authenticationId && (
				<PasswordResetForm
					authenticationId={authenticationId}
					onPasswordReset={onPasswordReset}
					onBack={goBackToEmailForm}
				/>
			)}
		</>
	);
};
