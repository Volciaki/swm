"use client";

import type { ReactElement } from "react";
import { useCallback } from "react";
import { toast as toastUpstream } from "react-toastify";
import { SuccessToast } from "./SuccessToast";

export enum ToastType {
	SUCCESS = "SUCCESS",
}

export type ToastProps = {
	title: string;
	message: string;
	type: ToastType;
};

const getToastByType: Record<ToastType, (props: ToastProps) => ReactElement> = {
	[ToastType.SUCCESS]: (props) => <SuccessToast {...props} />,
};

export const useToast = () => {
	const toast = useCallback((data: ToastProps) => {
		const componentGenerator = getToastByType[data.type];
		toastUpstream(componentGenerator(data));
	}, []);

	return { toast };
};
