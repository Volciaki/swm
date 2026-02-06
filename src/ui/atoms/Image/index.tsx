import { type FC, type InputHTMLAttributes } from "react";

export type ImageProps = InputHTMLAttributes<HTMLImageElement> & {
	src: string;
	alt: string;
};

export const Image: FC<ImageProps> = ({ src, alt, draggable = false, ...props }) => (
	<img src={src} alt={alt} draggable={draggable} {...props} />
);
