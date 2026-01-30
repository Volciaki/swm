"use client";

import { type FC, useState } from "react";
import { clsx } from "clsx";
import type { FileUploadProps } from "@/ui/molecules";
import { FileUpload } from "@/ui/molecules";
import { Paragraph } from "@/ui/atoms";
import styles from "./index.module.scss";

export type StandardFileUploadProps = Omit<FileUploadProps, "children"> & {
	height?: number;
};

export const StandardFileUpload: FC<StandardFileUploadProps> = ({ onUpload, height = 15, ...props }) => {
	const [hasUploaded, setHasUploaded] = useState(false);

	return (
		<FileUpload
			{...props}
			onUpload={(data) => {
				setHasUploaded(true);
				if (onUpload) onUpload(data);
			}}
		>
			<div
				className={clsx([styles["upload-field"]], { [styles["uploaded"]]: hasUploaded })}
				style={{ height: `${height}rem`, width: `${height * 1.75}rem` }}
			>
				<Paragraph fontSize={1.25} variant={"secondary"}>
					{"Przerzuć plik na te pole, lub go "}
					<span className={styles["clickable-text"]}>{"wybierz"}</span>
				</Paragraph>

				{/* TODO: add the upload icon here */}
			</div>
		</FileUpload>
	);
};
