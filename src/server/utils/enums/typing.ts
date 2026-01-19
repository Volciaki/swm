type Enum = Record<string, string>
type EnumValue<T extends Enum> = T[keyof T];

export const isValidEnumValue = <T extends Enum>(enumObject: T, value: string): value is EnumValue<T> => {
	return Object.values(enumObject).includes(value);
};
