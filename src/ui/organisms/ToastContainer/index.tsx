"use client";

import { ToastContainer as ToastContainerUpstream, type CloseButtonProps, Slide } from "react-toastify";
import { type FC } from "react";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./index.module.scss";

const ToastContainerCloseButton = ({ closeToast }: CloseButtonProps) => (
	<IoCloseOutline size={"2.5rem"} onClick={() => closeToast()} className={styles["close"]} />
);

export const ToastContainer: FC = () => (
	<ToastContainerUpstream
		position={"top-right"}
		autoClose={3000}
		closeOnClick={false}
		closeButton={ToastContainerCloseButton}
		transition={Slide}
		draggable={false}
		className={styles["container"]}
		toastClassName={styles["toast"]}
	/>
);
