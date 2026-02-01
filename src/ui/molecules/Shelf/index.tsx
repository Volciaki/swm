"use client";

import type { ReactNode, FC } from "react";
import { clsx } from "clsx";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Link from "next/link";
import type { FullShelfDTO } from "@/server/modules/storage/application/dto/shared/FullShelfDTOSchema";
import { Flex, Paragraph } from "@/ui/atoms";
import styles from "./index.module.scss";

type ZoomableProps = {
	children: ReactNode;
};

const Zoomable: FC<ZoomableProps> = ({ children }) => {
	return (
		<TransformWrapper initialScale={1} minScale={0.3} maxScale={3} centerOnInit>
			<TransformComponent wrapperClass={styles["zoomable-container"]}>{children}</TransformComponent>
		</TransformWrapper>
	);
};

export type ShelfProps = {
	shelfData: FullShelfDTO;
	cellSize?: number;
};

export const Shelf: FC<ShelfProps> = ({ shelfData, cellSize = 12.5 }) => {
	const columns = shelfData.cells[0].length;

	return (
		<Zoomable>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: `repeat(${columns}, 1fr)`,
					gap: "2rem",
					maxWidth: "100%",
					margin: "20rem",
				}}
			>
				{shelfData.cells.map((row, y) =>
					row.map((cell, x) => (
						<Link
							href={`/centrum-zarzadzania/wizualizacja/regaly/${shelfData.id}/asortymenty/${cell.assortment ? `${cell.assortment.id}/edytuj` : "nowy"}`}
							key={`cell-x-${x}-y-${y}`}
							style={{ textDecoration: "none" }}
						>
							<Flex
								direction={"column"}
								align={"center"}
								justify={"center"}
								className={clsx([styles["cell-container"], { [styles["has-assortment"]]: cell.assortment !== null }])}
								style={{ width: `${cellSize}rem`, height: `${cellSize * 0.75}rem` }}
							>
								{cell.assortment ? (
									<>
										<Paragraph fontSize={1.5} style={{ maxWidth: "100%" }} ellipsisOverflow>
											{cell.assortment.name}
										</Paragraph>

										<Paragraph fontSize={1.25} variant={"secondary"} style={{ maxWidth: "100%" }} ellipsisOverflow>
											{cell.assortment.comment}
										</Paragraph>
									</>
								) : (
									<Paragraph fontSize={1.5}>{"Wolne pole"}</Paragraph>
								)}

								<Paragraph fontSize={1.5}>{x + y * columns + 1}</Paragraph>
							</Flex>
						</Link>
					))
				)}
			</div>
		</Zoomable>
	);
};
