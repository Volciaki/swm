export const blobToBase64 = (blob: Blob): Promise<string> => {
	const reader = new FileReader();
	reader.readAsDataURL(blob);

	return new Promise<string>((resolve, reject) => {
		reader.onload = (e) => {
			if (e.target === null || e.target.result === null) {
				reject(new Error("Nie udało się przesłać pliku."));
				return;
			}

			resolve(e.target.result as string);
		};
	});
};
