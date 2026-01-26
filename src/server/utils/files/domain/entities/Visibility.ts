import { InvalidPublicVisibilityValue } from "../errors/InvalidPublicVisibilityValue";
import { InvalidPrivateVisibilityValue } from "../errors/InvalidPrivateVisibilityValue";

type Private = {
	isPublic: false;
	publicUrl: undefined;
};

type Public = {
	isPublic: true;
	publicUrl: string;
};

export type VisibilityValue = Private | Public;

export class Visibility<V extends VisibilityValue = VisibilityValue> {
	private constructor(private readonly _value: V) {}

	get publicUrl(): V["publicUrl"] {
		return this._value.publicUrl;
	}
	get isPublic(): V["isPublic"] {
		return this._value.isPublic;
	}

	static create(isPublic: boolean, publicUrl?: string) {
		if (!isPublic && publicUrl) throw new InvalidPrivateVisibilityValue();
		if (!isPublic) return new Visibility<Private>({ isPublic, publicUrl: undefined });
		if (!publicUrl) throw new InvalidPublicVisibilityValue();

		return new Visibility<Public>({ isPublic, publicUrl });
	}
}
