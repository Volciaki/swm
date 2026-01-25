import {FC} from "react";
import styles from "./index.module.scss";
import { useState } from "react";
import { Button, Flex, Paragraph } from "@/ui/atoms";

export type TwoFactorAuthenticationFormProps = {
    onSubmit: (value: string) => void;
};

export const TwoFactorAuthenticationForm: FC<TwoFactorAuthenticationFormProps> = ({ onSubmit }) => {
	const [value, setValue] = useState("");

	return(
		<Flex direction={"column"} align={"center"}>
			{/* TODO: replace with <Input /> component */}
			<input
				type="text"
				placeholder="000000"
				className={styles["form-style"]}
				onChange={(e) => setValue(e.target.value)}
			/>

			<Button onClick={() => onSubmit(value)}>
				<Paragraph>{"Submit"}</Paragraph>
			</Button>
		</Flex>
	);
}
