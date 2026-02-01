import { GetFullShelfDTO } from "@/server/modules/storage/application/dto/GetFullShelfDTO";
import { ShelfDTO } from "@/server/modules/warehouse/application/dto/shared/ShelfDTO";
import { type FC } from "react";

export type ShelfProps = {
	shelfData: GetFullShelfDTO;
};

export const Shelf: FC<ShelfProps> = ({ shelfData }) => (
	<div style={{ display: "grid", gridTemplateColumns: `${}` }}>
		{shelfData.cells.map(())}
	</div>
);
