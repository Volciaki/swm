"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Paragraph, Flex, Input } from "@/ui/atoms";
import { FormInput } from "@/ui/molecules";

export type FormFieldsProps<T extends FieldValues> = {
	sections: Array<{
		name: string;
		inputs: Array<{
			placeholder: string;
			formKey: Path<T>;
			required?: string;
			min?: {
				value: number;
				message: string;
			};
			validate?: (value: string | number) => string | undefined;
			hide?: boolean;
		}>;
	}>;
	control: Control<T>;
};

// TODO: use this component in previously created forms.
export const FormFields = <T extends FieldValues>({ sections, control }: FormFieldsProps<T>) => {
	return (
		<>
			{sections.map((section, sectionIndex) => (
				<Flex
					direction={"column"}
					align={"center"}
					style={{ gap: "1rem" }}
					key={`form-section-${sectionIndex}`}
					fullWidth
				>
					<Paragraph style={{ width: "100%", textAlign: "center", fontSize: "1.75rem" }}>{section.name}</Paragraph>

					<Flex direction={"row"} style={{ gap: "1rem" }} fullWidth>
						{section.inputs.map(
							(input, inputIndex) =>
								!input.hide && (
									<Controller
										key={`form-section-${sectionIndex}-input-${inputIndex}`}
										name={input.formKey}
										control={control}
										rules={{ required: input.required, min: input.min, validate: input.validate }}
										render={({ field, fieldState }) => (
											<FormInput error={fieldState.error} gap={1}>
												<Input placeholder={input.placeholder} fontSize={1.5} {...field} value={field?.value ?? ""} />
											</FormInput>
										)}
									/>
								)
						)}
					</Flex>
				</Flex>
			))}
		</>
	);
};
