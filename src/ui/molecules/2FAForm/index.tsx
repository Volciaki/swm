import {FC} from "react";
import styles from "./index.module.scss";
import { useState } from "react";

export type TwoFactorAuthenticationFormOnClick = {
    onClick: (twoFactorAuthenticationCode: string) => void;
};

const Input2FACodeForm: FC<TwoFactorAuthenticationFormOnClick> = ({ onClick }) => {
	const [twoFactorAuthenticationCode, settwoFactorAuthenticationCode] = useState("");

	return(
		<div
			className={styles[".container"]}
		>
			<input
				type="text"
				placeholder="Please type your 2FA code here"
				className={styles["form-style"]}
				onChange={(e) => settwoFactorAuthenticationCode(e.target.value)}
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

export default Input2FACodeForm