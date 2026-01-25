import {FC} from "react";
import styles from "./index.module.scss";
import { useState } from "react";

export type LoginFormOnClick = {
    onClick: (login_username: string, login_password: string) => void;
};

const InputLoginForm: FC<LoginFormOnClick> = ({ onClick }) => {
	const [login_username, setLogin_username] = useState("");
	const [login_password, setLogin_password] = useState("");

	return(
		<div className={styles["container"]}>
			<input
				type="text"
				placeholder="Login albo e-mail"
				className={styles["form-style"]}
				onChange={(e) => setLogin_username(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Hasło"
				className={styles["form-style"]}
				onChange={(e) => setLogin_password(e.target.value)}
			/>
			<button
				className={styles["button-style"]}
				onClick={() => {onClick(login_username, login_password)}}
			>
                Zaloguj się
			</button>
		</div>
	);
}

export default InputLoginForm