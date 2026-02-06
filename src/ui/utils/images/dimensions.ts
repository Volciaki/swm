export const getImageDimensions = async (url: string): Promise<{ width: number; height: number }> => {
	const img = new Image();
	img.src = url;

	return new Promise((resolve) => {
		img.onload = () => {
			resolve({ width: img.width, height: img.height });
		};
	});
};
