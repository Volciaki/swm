"use client";

import { type FC, useState } from "react";
import { clsx } from "clsx";
import { LuUpload } from "react-icons/lu";
import type { FileUploadProps } from "@/ui/molecules";
import { FileUpload } from "@/ui/molecules";
import { Flex, Paragraph } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";
import styles from "./index.module.scss";

export type StandardFileUploadProps = Omit<FileUploadProps, "children"> & {
	height?: number;
};

export const StandardFileUpload: FC<StandardFileUploadProps> = ({ onUpload, height = 15, ...props }) => {
	const [hasUploaded, setHasUploaded] = useState(false);
	const { mobile } = useMobile();

	return (
		<FileUpload
			{...props}
			onUpload={(data) => {
				setHasUploaded(true);
				if (onUpload) onUpload(data);
			}}
		>
			<Flex
				className={clsx([styles["upload-field"]], { [styles["uploaded"]]: hasUploaded })}
				style={{ height: `${height}rem`, width: `${height * 1.75}rem`, gap: "1rem" }}
				direction={"column"}
				align={"center"}
			>
				<Paragraph fontSize={mobile ? 1 : 1.25} variant={"secondary"}>
					{"Przerzuć plik na te pole, lub go "}
					<span className={styles["clickable-text"]}>{"wybierz"}</span>
				</Paragraph>

				<Flex style={{ height: "100%" }} align={"center"}>
					<LuUpload color={"#A7A7A7"} size={`${mobile ? 3 : 7}rem`} />
				</Flex>
			</Flex>
		</FileUpload>
	);
};
