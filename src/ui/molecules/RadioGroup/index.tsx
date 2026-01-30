"use client";

import { type FC, type ReactElement, Children, cloneElement, useCallback, useState } from "react";
import { Flex, type RadioGroupItemProps } from "@/ui/atoms";
import styles from "./index.module.scss";

type RadioGroupItem = ReactElement<RadioGroupItemProps>;

export type RadioGroupProps = {
	children: RadioGroupItem | RadioGroupItem[];
	formName: string;
	onChange?: (value: string) => void;
	defaultValue?: string;
};
export const RadioGroup: FC<RadioGroupProps> = ({ children, formName, onChange, defaultValue }) => {
	const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);
	const items = Children.toArray(children) as RadioGroupItem[];

	const handleChange = useCallback(
		(value: string) => {
			setSelectedValue(value);
			onChange?.(value);
		},
		[onChange]
	);

	return (
		<Flex direction={"column"} className={styles["container"]}>
			{items.map((item, index) =>
				cloneElement(item, {
					...item.props,
					formName,
					selectedValue,
					onChange: handleChange,
					key: `radio-group-${formName}-item-${index}`,
				})
			)}
		</Flex>
	);
};
