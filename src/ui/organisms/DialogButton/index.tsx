"use client";

import { forwardRef, useEffect, useImperativeHandle, useState, type ReactNode } from "react";
import { Dialog } from "@/ui/molecules";
import { Button, type ButtonProps } from "@/ui/atoms";

export type DialogButtonHandle = {
	close: () => void;
	open: () => void;
};

export type DialogButtonProps = ButtonProps & {
	buttonContent: ReactNode;
	onMount?: () => void;
};

export const DialogButton = forwardRef<DialogButtonHandle, DialogButtonProps>(
	({ children, buttonContent, onClick, onMount, ...rest }, ref) => {
		const [isDialogOpen, setIsDialogOpen] = useState(false);

		useImperativeHandle(ref, () => ({
			open: () => setIsDialogOpen(true),
			close: () => setIsDialogOpen(false),
		}));

		useEffect(() => {
			onMount?.();
		}, [onMount]);

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
	}
);

DialogButton.displayName = "DialogButton";
