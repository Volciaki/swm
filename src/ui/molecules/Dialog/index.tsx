import type { FC, ReactNode } from "react";
import { clsx } from "clsx";
import type { UseStateSetter } from "@/ui/types";
import { Button, Flex, Paragraph } from "@/ui/atoms";
import styles from "./index.module.scss";

type StandardChildrenContainerProps = {
	children: ReactNode;
	setIsOpen: UseStateSetter<boolean>;
};

const StandardChildrenContainer: FC<StandardChildrenContainerProps> = ({ children, setIsOpen }) => (
	<Flex direction={"column"} align={"center"} className={styles["standard-children-container"]}>
		{children}

		<Button onClick={() => setIsOpen(false)}>
			<Paragraph>{"Anuluj"}</Paragraph>
		</Button>
	</Flex>
);

export type DialogProps = {
	children: ReactNode;
	isOpen: boolean;
	setIsOpen: UseStateSetter<boolean>;
	variant?: "standard" | "raw";
};

export const Dialog: FC<DialogProps> = ({ children, isOpen, setIsOpen, variant = "standard" }) => (
	<div className={clsx(styles["overlay"], { [styles["open"]]: isOpen })} onClick={() => setIsOpen(false)}>
		<dialog className={styles["dialog"]} open={isOpen} onClick={(event) => event.stopPropagation()}>
			{variant === "standard" ? (
				<StandardChildrenContainer setIsOpen={setIsOpen}>{children}</StandardChildrenContainer>
			) : (
				<>{children}</>
			)}
		</dialog>
	</div>
);
