import type { UUID } from "@/server/utils";
import type { NotificationVO } from "../vo/NotificationVO";
import type { AssortmentDefinition } from "./AssortmentDefinition";

// A single day.
const CLOSE_TO_EXPIRATION_SECONDS = 24 * 60 * 60;

export class Assortment {
	private constructor(
		private _id: UUID,
		private _cellId: UUID,
		private _shelfId: UUID,
		private _definition: AssortmentDefinition,
		private _storedAt: Date,
		private _hasExpired: boolean,
		private _hasExpiredNotification: NotificationVO | null,
		private _isCloseToExpiration: boolean,
		private _isCloseToExpirationNotification: NotificationVO | null
	) {
		this.updateExpirationDetails();
	}

	get id() {
		return this._id;
	}
	get cellId() {
		return this._cellId;
	}
	get shelfId() {
		return this._shelfId;
	}
	get definition() {
		return this._definition;
	}
	get storedAt() {
		return this._storedAt;
	}
	get hasExpired() {
		return this._hasExpired;
	}
	get hasExpiredNotification() {
		return this._hasExpiredNotification;
	}
	get isCloseToExpiration() {
		return this._isCloseToExpiration;
	}
	get isCloseToExpirationNotification() {
		return this._isCloseToExpirationNotification;
	}

	set isCloseToExpirationNotification(value: NotificationVO | null) {
		this._isCloseToExpirationNotification = value;
	}
	set hasExpiredNotification(value: NotificationVO | null) {
		this._hasExpiredNotification = value;
	}

	private getExpirationDetails(): { hasExpired: boolean; isCloseToExpiration: boolean } {
		const currentTimestamp = new Date().getTime();
		const expirationTimeststamp = this.storedAt.getTime() + this._definition.expiresAfter.milliseconds.value;

		const timeDifferenceMilliseconds = expirationTimeststamp - currentTimestamp;

		return {
			hasExpired: timeDifferenceMilliseconds <= 0,
			isCloseToExpiration: timeDifferenceMilliseconds <= CLOSE_TO_EXPIRATION_SECONDS * 1000,
		};
	}

	updateExpirationDetails() {
		const expirationDetails = this.getExpirationDetails();
		this._hasExpired = expirationDetails.hasExpired;
		this._isCloseToExpiration = expirationDetails.isCloseToExpiration;
	}

	static create(
		id: UUID,
		cellId: UUID,
		shelfId: UUID,
		assortmentDefinition: AssortmentDefinition,
		storedAt: Date,
		hasExpired: boolean,
		hasExpiredNotification: NotificationVO | null,
		isCloseToExpiration: boolean,
		isCloseToExpirationNotification: NotificationVO | null
	) {
		return new Assortment(
			id,
			cellId,
			shelfId,
			assortmentDefinition,
			storedAt,
			hasExpired,
			hasExpiredNotification,
			isCloseToExpiration,
			isCloseToExpirationNotification
		);
	}
}
