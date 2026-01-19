import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("temperature_readings")
export class DBTemperatureReading {
	@PrimaryColumn()
	id!: string;

	@Column({ name: "shelf_id" })
	shelfId!: string;

	@Column()
	date!: Date;

	@Column({ name: "temperature_celsius" })
	temperatureCelsius!: number;

	@Column({ name: "temperature_was_too_low" })
	temperatureWasTooLow!: boolean;

	@Column({ name: "temperature_was_too_high" })
	temperatureWasTooHigh!: boolean;
}
