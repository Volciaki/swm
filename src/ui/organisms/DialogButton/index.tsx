"use client";

import { useState, type FC, type ReactNode } from "react";
import { Dialog } from "@/ui/molecules";
import { Button, type ButtonProps } from "@/ui/atoms";

export type DialogButtonProps = ButtonProps & {
	buttonContent: ReactNode;
};

export const DialogButton: FC<DialogButtonProps> = ({ children, buttonContent, onClick, ...rest }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<>
			<Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
				{children}
			</Dialog>

			<Button
				onClick={(event) => {
					setIsDialogOpen((current) => !current);
					if (onClick) onClick(event);
				}}
				{...rest}
			>
				{buttonContent}
			</Button>
		</>
	);
};
