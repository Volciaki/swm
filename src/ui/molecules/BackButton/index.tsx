"use client";

import { useCallback, type FC } from "react";
import { useRouter } from "next/navigation";
import { useMobile } from "@/ui/hooks";
import { Paragraph, Button } from "../../atoms";
import styles from "./index.module.scss";

export type BackButtonProps = {
	fallback?: string;
	forceFallback?: boolean;
	onClick?: () => void;
	enableDefaultOnClick?: boolean;
};

export const BackButton: FC<BackButtonProps> = ({ fallback, forceFallback, onClick, enableDefaultOnClick = true }) => {
	const router = useRouter();
	const { mobile } = useMobile();

	const handleBack = useCallback(() => {
		if (!fallback) {
			console.error('Passing in the "fallback" prop is required when using default BackButton click handler!');
			return;
		}

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
		<Button
			onClick={() => {
				if (onClick) onClick();
				if (enableDefaultOnClick) handleBack();
			}}
			className={styles["container"]}
		>
			<Paragraph fontSize={mobile ? 1.25 : 1.5}>{"Powrót"}</Paragraph>
		</Button>
	);
};
