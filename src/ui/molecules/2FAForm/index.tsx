import {FC} from "react";
import styles from "./index.module.scss";
import { useState } from "react";

export type TwoFactorAuthenticationFormOnClick = {
    onClick: (twoFactorAuthenticationCode: string) => void;
};

export const Input2FACodeForm: FC<TwoFactorAuthenticationFormOnClick> = ({ onClick }) => {
	const [twoFactorAuthenticationCode, setTwoFactorAuthenticationCode] = useState("");

	return(
		<div
			className={styles[".container"]}
		>
			<input
				type="text"
				placeholder="Please type your 2FA code here"
				className={styles["form-style"]}
				onChange={(e) => setTwoFactorAuthenticationCode(e.target.value)}
			/>
			<button
				className={styles["button-style"]}
				onClick={() => onClick(twoFactorAuthenticationCode)}
			>
                Submit
			</button>
		</div>
	);
}
