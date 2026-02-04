"use client";

import { useCallback, type FC } from "react";
import { useRouter } from "next/navigation";
import { Paragraph, Button } from "../../atoms";
import styles from "./index.module.scss";

export type BackButtonProps = {
	fallback: string;
	forceFallback?: boolean;
};

export const BackButton: FC<BackButtonProps> = ({ fallback, forceFallback }) => {
	const router = useRouter();

	const handleBack = useCallback(() => {
		if (forceFallback) {
			router.push(fallback);
			return;
		}

		if (window.history.length > 1) {
			router.back();
		} else {
			router.push(fallback);
		}
	}, [router, forceFallback, fallback]);

	return (
		<Button onClick={() => handleBack()} className={styles["container"]}>
			<Paragraph fontSize={1.5}>{"Powrót"}</Paragraph>
		</Button>
	);
};
