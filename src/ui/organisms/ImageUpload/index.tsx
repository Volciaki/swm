import { type FC, useState, useCallback, useMemo } from "react";
import { Image } from "@/ui/atoms";
import { type FileUploadProps, FileUpload } from "../../molecules";
import { getImageDimensions } from "../../utils";

type PreviewProps = Omit<Exclude<ImageUploadProps["preview"], undefined>, "position"> & { file: Blob | null };

const Preview: FC<PreviewProps> = ({ altText, show, maxWidth, maxHeight, file }) => {
	if (!show || !file) return;

	return (
		<Image
			src={URL.createObjectURL(file)}
			alt={altText ? altText : "Wybrane zdjęcie"}
			draggable={false}
			style={{
				maxWidth: `${maxWidth}px`,
				maxHeight: `${maxHeight}px`,
			}}
		/>
	);
};

export type ImageUploadProps = {
	dimensions?: {
		minWidth?: number;
		minHeight?: number;
		aspectRatio?: number | null;
	};
	preview?: {
		maxWidth?: number;
		maxHeight?: number;
		show?: boolean;
		position?: "top" | "bottom";
		altText?: string | null;
	};
} & FileUploadProps;

export const ImageUpload: FC<ImageUploadProps> = ({
	onUpload,
	onError = () => undefined,
	dimensions: dimensionsProp = {},
	preview: previewProp = {},
	accept = "image/png",
	...props
}) => {
	const dimensions: Required<ImageUploadProps["dimensions"]> = useMemo(
		() => ({
			minWidth: 0,
			minHeight: 0,
			aspectRatio: null,
			...dimensionsProp,
		}),
		[dimensionsProp]
	);
	const preview: Required<ImageUploadProps["preview"]> = useMemo(
		() => ({
			altText: null,
			position: "top",
			maxHeight: 300,
			maxWidth: 300,
			show: false,
			...previewProp,
		}),
		[previewProp]
	);

	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = useCallback(
		async (file: File) => {
			const { width, height } = await getImageDimensions(URL.createObjectURL(file));

			if (width < dimensions.minWidth) {
				// prettier-ignore
				onError(`Zdjęcie musi posiadać minimum ${dimensions.minWidth}px szerokości.`);
				return;
			}

			if (height < dimensions.minHeight) {
				// prettier-ignore
				onError(`Zdjęcie musi posiadać minimum ${dimensions.minWidth}px wysokości.`);
				return;
			}

			if (dimensions.aspectRatio !== null) {
				const aspectRatio = width / height;
				if (dimensions.aspectRatio !== aspectRatio) {
					onError("Zdjęcie posiada nieprawidłową proporcję.");
					return;
				}
			}

			setFile(file);
			onUpload(file);
		},
		[onUpload, onError, dimensions]
	);

	return (
		<>
			{preview.position === "top" && <Preview {...{ ...preview, file }} />}

			<FileUpload {...{ ...props, onError, accept }} onUpload={handleFileChange} />

			{preview.position === "bottom" && <Preview {...{ ...preview, file }} />}
		</>
	);
};
