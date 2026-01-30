"use client";

import { type FC, type DragEventHandler, type ChangeEventHandler, type ReactNode, useCallback, useRef } from "react";

export type FileUploadProps = {
	onUpload: (data: File) => void;
	children?: ReactNode;
	onError?: (errorMessage: string) => void;
	maxSizeBytes?: number;
	accept?: string;
};

export const FileUpload: FC<FileUploadProps> = ({
	onUpload,
	children,
	accept,
	onError = () => undefined,
	maxSizeBytes = 1024 * 1024 * 1,
}) => {
	const fileUpload = useRef<HTMLInputElement | null>(null);

	const handleButtonClick = useCallback(() => {
		if (!fileUpload.current) return;

		fileUpload.current.click();
	}, []);

	const handleButtonDrop: DragEventHandler = useCallback(
		(event) => {
			event.preventDefault();

			const file = event.dataTransfer.files[0];
			if (!file || !fileUpload.current) {
				onError("Nie udało się przesłać pliku.");
				return;
			}

			const data = new DataTransfer();
			data.items.add(file);

			fileUpload.current.files = data.files;

			// Trigger a file change event.
			const changeEvent = new Event("change", { bubbles: true });
			fileUpload.current.dispatchEvent(changeEvent);
		},
		[onError]
	);

	const handleFileChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		async (event) => {
			const file = event.target.files?.[0];
			if (!file) {
				onError("Nie udało się przesłać pliku.");
				return;
			}

			if (file.size > maxSizeBytes) {
				// prettier-ignore
				onError(`Plik jest zbyt ciężki. Maksymalny rozmiar to ${Math.floor(maxSizeBytes / 1024 / 1024)} MiB.`);
				return;
			}

			onUpload(file);
		},
		[onUpload, onError, maxSizeBytes]
	);

	return (
		<>
			<div onDragOver={(event) => event.preventDefault()} onClick={handleButtonClick} onDrop={handleButtonDrop}>
				{children}
			</div>

			<input ref={fileUpload} type={"file"} accept={accept} onChange={handleFileChange} style={{ display: "none" }} />
		</>
	);
};
