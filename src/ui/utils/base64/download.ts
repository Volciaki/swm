export const downloadBase64 = (base64: string, filename: string) => {
	const anchor = document.createElement("a");
	anchor.href = base64;
	anchor.download = filename;

	document.body.appendChild(anchor);

	anchor.click();

	document.body.removeChild(anchor);
};
