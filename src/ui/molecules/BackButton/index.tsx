"use client";

import { useCallback, type FC } from "react";
import { useRouter } from "next/navigation";
import { Paragraph, Button } from "../../atoms";
import styles from "./index.module.scss";

export type BackButtonProps = {
	// Will navigate to this location if there's no more history.
	fallback: string;
};

export const BackButton: FC<BackButtonProps> = ({ fallback }) => {
	const router = useRouter();

	const handleBack = useCallback(() => {
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push(fallback);
		}
	}, [router, fallback]);

	return (
		<Button onClick={() => handleBack()} className={styles["container"]}>
			<Paragraph fontSize={1.5}>{"Powrót"}</Paragraph>
		</Button>
	);
};
