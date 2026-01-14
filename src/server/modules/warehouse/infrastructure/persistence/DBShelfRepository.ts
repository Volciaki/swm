import { In, Repository } from "typeorm";
import { UUID } from "@/server/utils";
import { ShelfRepository } from "../../domain/repositories/ShelfRepository";
import { Shelf } from "../../domain/entities/Shelf";
import { DBShelf } from "../entities/DBShelf";
import { CellWithContext, ShelfMapper } from "../mappers/ShelfMapper";
import { DBCell } from "../entities/DBCell";
import { CellMapper } from "../mappers/CellMapper";
import { AssortmentVO } from "../../domain/vo/AssortmentVO";

export class DBShelfRepository implements ShelfRepository {
	constructor(
        private readonly db: Repository<DBShelf>,
        private readonly cells: Repository<DBCell>,
	) {}

	async create(shelf: Shelf) {
		const dbShelf = ShelfMapper.fromShelfToDBShelf(shelf);
		await this.db.save(dbShelf);

		const dbCells = shelf.cells.flat().map((cell) => CellMapper.fromCellToDBCell(cell));
		for (const dbCell of dbCells) {
			await this.cells.save(dbCell);
		}
	}

	async update(shelf: Shelf) {
		// TypeORM's `save` method acts as UPSERT if the primary key exists.
		return await this.create(shelf);
	}

	async delete(shelf: Shelf) {
		const dbCells = await this.cells.find({ where: { shelfId: shelf.id.value }});
		for (const dbCell of dbCells) {
			await this.cells.remove(dbCell);
		}

		const dbShelf = await this.db.findOneBy({ id: shelf.id.value });

		if (dbShelf === null) return;

		await this.db.remove(dbShelf);
	}

	async getById(id: UUID, assortmentContext?: AssortmentVO[]) {
		const dbShelf = await this.db.findOneBy({ id: id.value });

		if (dbShelf === null) return null;

		const cells: CellWithContext[][] = [];
		for (const cellRowIds of dbShelf.cellIds) {
			// TODO: does this keep the ordering of cells? This will be well visible after the frontend is written.
			const rowDBCells = await this.cells.find({ where: { id: In(cellRowIds) }});
			const rowCells = rowDBCells.map((dbCell) => ({
				db: dbCell,
				valueObject: assortmentContext === undefined
					? null
					: assortmentContext.find((valueObject) => valueObject.id === dbCell.assortmentId) ?? null,
			}));
			cells.push(rowCells);
		}
		return ShelfMapper.fromDBShelfToShelf(dbShelf, cells);
	}

	async getAll(assortmentContext?: AssortmentVO[]) {
		const dbShelves = await this.db.find();
		const shelves = dbShelves.map(async (dbShelf) => {
			const dbShelfId = UUID.fromString(dbShelf.id);
			return await this.getById(dbShelfId, assortmentContext);
		});
		const shelvesFetched = await Promise.all(shelves);

		return shelvesFetched.filter((shelf) => shelf !== null);
	}
}
