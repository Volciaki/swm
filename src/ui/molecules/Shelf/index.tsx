"use client";

import { type ReactNode, type MouseEvent, type PointerEvent, type FC, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Link from "next/link";
import type { FullShelfDTO } from "@/server/modules/storage/application/dto/shared/FullShelfDTOSchema";
import { Paragraph } from "@/ui/atoms";
import { useMobile } from "@/ui/hooks";
import styles from "./index.module.scss";
import { Block } from "../Block";

// If our cursor has moved more than this amount of pixels, our user is most likely scrolling, and we shouldn't trigger the links.
const PANNING_DEADZONE = 10;

type ZoomableProps = {
	children: ReactNode;
	focusElementId?: string;
};

const Zoomable: FC<ZoomableProps> = ({ children, focusElementId }) => {
	const { mobile } = useMobile();

	const cursorStartY = useRef(0);
	const cursorStartX = useRef(0);
	const cursorMoved = useRef(false);

	const onPointerDown = (e: PointerEvent) => {
		cursorStartY.current = e.clientY;
		cursorStartX.current = e.clientX;

		cursorMoved.current = false;
	};

	const onPointerMove = (e: PointerEvent) => {
		const changeX = Math.abs(e.clientX - cursorStartX.current);
		const changeY = Math.abs(e.clientY - cursorStartY.current);
		const change = changeX + changeY;

		if (change > PANNING_DEADZONE) cursorMoved.current = true;
	};

	const onClickCapture = (e: MouseEvent) => {
		if (!cursorMoved.current) return;

		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<TransformWrapper
			initialScale={1}
			minScale={0.3}
			maxScale={mobile ? 1.5 : 3}
			onInit={({ zoomToElement }) => {
				if (!focusElementId) return;

				const element = document.getElementById(focusElementId);

				if (!element) return;

				setTimeout(() => {
					zoomToElement(element, mobile ? 1.5 : 2, 1000, "easeInOutQuad");
				}, 100);
			}}
			centerOnInit
		>
			<TransformComponent wrapperClass={styles["zoomable-container"]}>
				<div onPointerDown={onPointerDown} onPointerMove={onPointerMove} onClickCapture={onClickCapture}>
					{children}
				</div>
			</TransformComponent>
		</TransformWrapper>
	);
};

export type ShelfProps = {
	shelfData: FullShelfDTO;
	cellToFocus?: {
		x: number;
		y: number;
	};
	cellSize?: number;
};

export const Shelf: FC<ShelfProps> = ({ shelfData, cellToFocus, cellSize = 12.5 }) => {
	const { mobile } = useMobile();
	const columns = shelfData.cells[0].length;
	const generateCellId = ({ x, y }: { x: number; y: number }) => `cell-x-${x}-y-${y}`;

	return (
		<Zoomable focusElementId={cellToFocus ? generateCellId(cellToFocus) : undefined}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${columns}, 1fr)`,
					gap: "2rem",
					maxWidth: "100%",
					margin: `${mobile ? 10 : 20}rem`,
				}}
			>
				{shelfData.cells.map((row) =>
					row.map((cell) => (
						<Link
							id={generateCellId(cell)}
							href={`/centrum-zarzadzania/wizualizacja/regaly/${shelfData.id}/asortymenty/${cell.assortment ? `${cell.assortment.id}` : `nowy/${cell.id}`}`}
							key={generateCellId(cell)}
							style={{ textDecoration: "none" }}
						>
							<Block
								style={{ width: `${cellSize}rem`, height: `${cellSize * 0.75}rem` }}
								variant={cell.assortment === null ? "secondary" : "primary"}
								className={styles["cell-container"]}
							>
								{cell.assortment ? (
									<>
										<Paragraph fontSize={1.5} style={{ maxWidth: "100%" }} ellipsisOverflow>
											{cell.assortment.definition.name}
										</Paragraph>

										<Paragraph fontSize={1.25} variant={"secondary"} style={{ maxWidth: "100%" }} ellipsisOverflow>
											{cell.assortment.definition.comment}
										</Paragraph>
									</>
								) : (
									<Paragraph fontSize={1.5}>{"Wolne pole"}</Paragraph>
								)}

								<Paragraph fontSize={1.5}>{cell.index + 1}</Paragraph>
							</Block>
						</Link>
					))
				)}
			</div>
		</Zoomable>
	);
};
