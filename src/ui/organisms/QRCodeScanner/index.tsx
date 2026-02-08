"use client";

import { useEffect, useRef, useState, type FC } from "react";
import { Scanner, useDevices } from "@yudiel/react-qr-scanner";
import { Paragraph } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";
import styles from "./index.module.scss";

export type QRCodeScannerProps = {
	onScan?: (value: unknown) => void;
	onError?: () => void;
	size?: number;
	isPaused?: boolean;
};

export const QRCodeScanner: FC<QRCodeScannerProps> = ({ onScan, onError, isPaused = true, size = 15 }) => {
	const { mobile } = useMobile();
	const devices = useDevices();
	const [isCameraReady, setIsCameraReady] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const video = containerRef.current.querySelector("video");
		if (!video) return;

		const handlePlaying = () => setIsCameraReady(true);

		video.addEventListener("playing", handlePlaying);
		return () => video.removeEventListener("playing", handlePlaying);
	}, [isPaused]);

	if (devices.length === 0)
		return (
			<Paragraph fontSize={mobile ? 1 : 1.25} variant={"danger"}>
				{
					"W celu zeskanowania kodu QR twoje urządzenie musi posiadać chociaż jedną kamere. Niestety nie udało się nam wykryć żadnej."
				}
			</Paragraph>
		);

	return (
		<div style={{ width: `${size}rem`, height: `${size}rem`, position: "relative" }} ref={containerRef}>
			<Scanner
				onScan={(result) => onScan?.(result[0].rawValue)}
				paused={isPaused}
				sound={false}
				onError={onError}
				components={{ finder: false }}
			/>

			{isCameraReady && (
				<div className={styles["overlay-container"]} style={{ width: `${size * 0.5}rem`, height: `${size * 0.5}rem` }}>
					<div className={styles["overlay"]} />
				</div>
			)}
		</div>
	);
};
